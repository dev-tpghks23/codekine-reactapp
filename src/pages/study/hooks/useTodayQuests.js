// 오늘의 퀘스트 훅 담당: 로그인 사용자의 오늘 학습 개수를 퀘스트에 반영
import { useEffect, useMemo, useState } from "react";
import { fetchTodayCompletedWordCount } from "../apis/LearnApi";
import { useStudyUser } from "./useStudyUser";

export const useTodayQuests = (baseQuests = []) => {
  const { userId, isGuest } = useStudyUser();
  const [todayCompletedCount, setTodayCompletedCount] = useState(0);

  // 오늘학습조회: 로그인 사용자가 오늘 완료한 단어 개수를 가져옴
  useEffect(() => {
    let ignore = false;

    if (isGuest || !userId) {
      setTodayCompletedCount(0);

      return undefined;
    }

    fetchTodayCompletedWordCount(userId)
      .then((count) => {
        if (!ignore) {
          setTodayCompletedCount(Number(count) || 0);
        }
      })
      .catch(() => {
        if (!ignore) {
          setTodayCompletedCount(0);
        }
      });

    return () => {
      ignore = true;
    };
  }, [isGuest, userId]);

  // 단어 학습 퀘스트: 오늘 완료한 단어 개수를 공통으로 반영
  return useMemo(
    () =>
      baseQuests.map((quest, index) =>
        index <= 1
          ? {
              ...quest,
              current: Math.min(todayCompletedCount, quest.total),
            }
          : quest
      ),
    [baseQuests, todayCompletedCount]
  );
};
