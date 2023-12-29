import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  setGenreData,
  setPage,
  setSelectedGenre,
  setSortBy,
} from "../store/slice";
import MovieCard from "./MovieCard";
import * as St from "../components/styles";

const Main = () => {
  const dispatch = useDispatch();
  const { data, genreData, page, selectedGenre, sortBy } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    const fetchData = async () => {
      const movieOptions = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmEyYzIzMWRjMTQxMGEzNjk3ZWEzOWQyMjY2M2IwZiIsInN1YiI6IjY1MzBlZmMzNTFhNjRlMDBjOGZkY2I5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jYFT5VOAZYR9SPBGGB16_GUZgiU7Bmkvz6G-5Qwiw48",
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=ko-KR&page=${page}&_limit=10&sort_by=popularity.desc&with_origin_country=JP`,
          movieOptions
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const movieResult = await response.json();
        dispatch(setData(movieResult.results));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page, dispatch]);

  useEffect(() => {
    const fetchGenres = async () => {
      const genreOptions = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmEyYzIzMWRjMTQxMGEzNjk3ZWEzOWQyMjY2M2IwZiIsInN1YiI6IjY1MzBlZmMzNTFhNjRlMDBjOGZkY2I5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jYFT5VOAZYR9SPBGGB16_GUZgiU7Bmkvz6G-5Qwiw48",
        },
      };

      try {
        const genreResponse = await fetch(
          "https://api.themoviedb.org/3/genre/tv/list?language=ko",
          genreOptions
        );

        if (!genreResponse.ok) {
          throw new Error("Network 장르response was not ok");
        }

        const genreResult = await genreResponse.json();
        dispatch(setGenreData(genreResult.genres)); // 여기서 dispatch를 사용
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
  }, [dispatch]); // dispatch를 의존성 배열에 추가

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

  const handleGenreChange = (genreId) => {
    dispatch(setSelectedGenre(genreId));
  };

  const handleSortChange = (sortValue) => {
    dispatch(setSortBy(sortValue));
  };

  // 필터링된 영화 목록
  const filteredMovies = data.results
    ?.filter(
      (movie) => !selectedGenre || movie.genre_ids.includes(selectedGenre)
    )
    .sort((a, b) => {
      if (sortBy === "popularity.desc") {
        return b.popularity - a.popularity;
      } else if (sortBy === "vote_average.desc") {
        return b.vote_average - a.vote_average;
      } else if (sortBy === "first_air_date.desc") {
        return new Date(b.first_air_date) - new Date(a.first_air_date);
      }
      return 0;
    });

  return (
    <St.Container>
      <St.SelectBox>
        <St.Label htmlFor="genre">장르 선택: </St.Label>
        <St.Select
          id="genre"
          onChange={(e) => handleGenreChange(Number(e.target.value))}
        >
          <option value={null}>전체</option>
          {genreData.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </St.Select>
        <St.Label htmlFor="sort">정렬 선택: </St.Label>
        <St.Select id="sort" onChange={(e) => handleSortChange(e.target.value)}>
          <option value="popularity.desc">인기순</option>
          <option value="vote_average.desc">평점순</option>
          <option value="first_air_date.desc">신작순</option>
        </St.Select>
      </St.SelectBox>
      <St.MovieList>
        {filteredMovies &&
          filteredMovies.map((item) => (
            <MovieCard key={item.id} movie={item} genres={genreData} />
          ))}
      </St.MovieList>
      <St.LoadMoreButton onClick={handleLoadMore}>더보기</St.LoadMoreButton>
    </St.Container>
  );
};

export default Main;
