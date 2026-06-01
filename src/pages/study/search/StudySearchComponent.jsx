// 검색화면컴포넌트: 검색창, 결과 목록, 상세 카드 전환을 담당합니다.
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchSignWords } from "../apis/SignWordApi";
import { useSignWordSearch } from "../hooks/useSignWordSearch";
import { mapSignWords } from "../mappers/signWordMapper";
import SearchResultCard from "./parts/SearchResultCard";
import SearchResultList from "./parts/SearchResultList";
import * as S from "./style";

const StudySearchComponent = () => {
  const location = useLocation();
  const initialKeyword = location.state?.keyword || new URLSearchParams(location.search).get("keyword") || "";
  const {
    keyword,
    setKeyword,
    results,
    setResults,
    selectedIndex,
    setSelectedIndex,
    loading,
    setLoading,
    error,
    setError,
  } = useSignWordSearch(initialKeyword);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // 검색카테고리: 실제 API 검색 결과에 포함된 분류만 필터로 보여줍니다.
  const categories = useMemo(
    () => ["전체", ...new Set(results.map((item) => item.category).filter(Boolean))],
    [results]
  );

  // 검색결과필터: API 결과를 카테고리 기준으로 한 번 더 골라냅니다.
  const filteredResults = useMemo(() => {
    return results.filter((item) => selectedCategory === "전체" || item.category === selectedCategory);
  }, [results, selectedCategory]);

  const selectedResult = selectedIndex !== null ? filteredResults[selectedIndex] : null;

  // 검색실행함수: 백엔드 검색 API 결과만 화면에 보여줍니다.
  const searchSignWords = async (searchKeyword = keyword) => {
    setLoading(true);
    setError(null);
    setSelectedIndex(null);
    setSelectedCategory("전체");

    try {
      const data = await fetchSignWords(searchKeyword);
      setResults(mapSignWords(data));
    } catch {
      setResults([]);
      setError("검색 서버에 연결하기 어려워요. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 첫검색실행: 검색 페이지에 처음 들어오면 기본 검색 결과를 준비합니다.
  useEffect(() => {
    searchSignWords(initialKeyword);
    // 최초 진입 시에만 실행하기 위해 의존성을 고정합니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 검색실행이벤트: 입력한 검색어로 결과 목록을 다시 보여줍니다.
  const handleSubmit = (event) => {
    event.preventDefault();
    searchSignWords(keyword);
  };

  // 카테고리선택함수: 선택한 분류 기준으로 결과를 다시 필터링합니다.
  const handleCategory = (category) => {
    setSelectedCategory(category);
    setSelectedIndex(null);

  };

  // 상세이동함수: 목록에서 선택한 결과를 상세 카드로 전환합니다.
  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  // 이전결과함수: 상세 카드에서 이전 검색결과로 이동합니다.
  const handlePrev = () => {
    setSelectedIndex((prev) => Math.max((prev ?? 0) - 1, 0));
  };

  // 다음결과함수: 상세 카드에서 다음 검색결과로 이동합니다.
  const handleNext = () => {
    setSelectedIndex((prev) => Math.min((prev ?? 0) + 1, filteredResults.length - 1));
  };

  return (
    <S.SearchWrap>
      <S.SearchHero>
        <S.Kicker>수어 검색</S.Kicker>
        <S.Title>필요한 수어 표현을 바로 찾아보세요</S.Title>
        <S.Desc>단어를 검색하고 카드에서 영상, 분류, 동작 설명을 확인할 수 있어요.</S.Desc>

        <S.SearchForm onSubmit={handleSubmit}>
          <S.SearchInput
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="예: 안녕하세요, 병원, 도와주세요"
            aria-label="수어 검색어"
          />
          <S.SearchButton type="submit">검색</S.SearchButton>
        </S.SearchForm>
      </S.SearchHero>

      <S.CategoryList aria-label="수어 검색 카테고리">
        {categories.map((category) => (
          <S.CategoryButton
            type="button"
            key={category}
            $active={selectedCategory === category}
            onClick={() => handleCategory(category)}
          >
            {category}
          </S.CategoryButton>
        ))}
      </S.CategoryList>

      <S.SearchContent>
        <S.ContentHead>
          <S.ContentTitle>{selectedResult ? "수어 상세" : "검색 결과"}</S.ContentTitle>
          <S.ResultCount>{loading ? "검색 중" : `${filteredResults.length}개`}</S.ResultCount>
        </S.ContentHead>

        {error && <S.SearchNotice>{error}</S.SearchNotice>}

        {loading ? (
          <S.EmptyBox>
            <strong>검색 결과를 불러오는 중이에요.</strong>
            <span>잠시만 기다려주세요.</span>
          </S.EmptyBox>
        ) : selectedResult ? (
          <SearchResultCard
            result={selectedResult}
            currentIndex={selectedIndex}
            totalCount={filteredResults.length}
            onBack={() => setSelectedIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        ) : filteredResults.length > 0 ? (
          <SearchResultList results={filteredResults} onSelect={handleSelect} />
        ) : (
          <S.EmptyBox>
            <strong>검색 결과가 없어요.</strong>
            <span>다른 단어나 카테고리로 다시 검색해보세요.</span>
          </S.EmptyBox>
        )}
      </S.SearchContent>
    </S.SearchWrap>
  );
};

export default StudySearchComponent;
