// 수어 검색 데이터 변환: 백엔드 응답 -> 검색 화면 데이터
export const mapSignWord = (signWord, index = 0) => ({
  id: signWord.id || index + 1,
  word: signWord.signWordTitle || "단어 정보 없음",
  category: signWord.signWordCategory || "분류 정보 없음",
  desc: signWord.signWordDescription || "수어 설명이 준비되지 않았어요.",
  shortDesc: signWord.signWordDescription || "수어 설명이 준비되지 않았어요.",
  cardImage: signWord.signWordThumbnailUrl,
  videoUrl: signWord.signWordVideoUrl,
  sourceUrl: signWord.signWordSourceUrl,
});

export const mapSignWords = (signWords = []) => signWords.map(mapSignWord);
