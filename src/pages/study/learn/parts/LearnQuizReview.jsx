// 학습퀴즈복습카드: 오답 후 핵심 설명 -> 다시 보여줌
import * as S from "../style";

const LearnQuizReview = ({
  label = "📖 수어 배우기",
  headline = "이 수어를 기억해봐요!",
  mediaText = "수어 이미지/영상 슬롯",
  wordLabel = "수어 표현",
  title,
  desc,
  videoUrl,
  imageUrl,
  onSkip,
  onRemember,
}) => {
  return (
    <S.LearnReviewCard>
      <S.LearnReviewIntro>
        <S.LearnReviewLabel>{label}</S.LearnReviewLabel>
        <S.LearnReviewTitle>{headline}</S.LearnReviewTitle>
        <S.LearnReviewDesc>영상과 설명을 보며 수어 표현을 다시 확인해보세요.</S.LearnReviewDesc>
      </S.LearnReviewIntro>

      <S.LearnReviewContent>
        <S.LearnReviewMedia>
          {videoUrl ? (
            <video controls preload="metadata">
              <source src={videoUrl} />
              수어 영상을 재생할 수 없어요.
            </video>
          ) : imageUrl ? (
            <img src={imageUrl} alt={`${title} 수어`} />
          ) : (
            <p>📌 {mediaText}</p>
          )}
        </S.LearnReviewMedia>
        <S.LearnReviewInfo>
          <span>{wordLabel}</span>
          <S.LearnReviewWord>{title}</S.LearnReviewWord>
          <span>설명</span>
          <p>{desc}</p>
        </S.LearnReviewInfo>
      </S.LearnReviewContent>

      <S.LearnQuizBottom>
        <S.LearnQuizSkip type="button" onClick={onSkip}>
          건너뛰기
        </S.LearnQuizSkip>
        <S.LearnQuizCheck type="button" onClick={onRemember}>
          확인
        </S.LearnQuizCheck>
      </S.LearnQuizBottom>
    </S.LearnReviewCard>
  );
};

export default LearnQuizReview;
