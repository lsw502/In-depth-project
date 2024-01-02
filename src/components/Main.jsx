import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setData,
    setGenreData,
    setPage,
    setSelectedGenre,
    setSortBy
} from '../store/slice';
import MovieCard from './MovieCard';
import * as St from './mainStyles';

const Main = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { data, genreData, page, selectedGenre, sortBy } = useSelector(
        (state) => state.movie
    );

    useEffect(() => {
        const fetchData = async () => {
            const movieOptions = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmEyYzIzMWRjMTQxMGEzNjk3ZWEzOWQyMjY2M2IwZiIsInN1YiI6IjY1MzBlZmMzNTFhNjRlMDBjOGZkY2I5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jYFT5VOAZYR9SPBGGB16_GUZgiU7Bmkvz6G-5Qwiw48'
                }
            };

            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=ko-KR&page=${page}&_limit=60&sort_by=popularity.desc&with_origin_country=JP`,
                    movieOptions
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const movieResult = await response.json();
                dispatch(setData(movieResult.results));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [page]);

    useEffect(() => {
        const fetchGenres = async () => {
            const genreOptions = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmEyYzIzMWRjMTQxMGEzNjk3ZWEzOWQyMjY2M2IwZiIsInN1YiI6IjY1MzBlZmMzNTFhNjRlMDBjOGZkY2I5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jYFT5VOAZYR9SPBGGB16_GUZgiU7Bmkvz6G-5Qwiw48'
                }
            };

            try {
                const genreResponse = await fetch(
                    'https://api.themoviedb.org/3/genre/tv/list?language=ko',
                    genreOptions
                );

                if (!genreResponse.ok) {
                    throw new Error('Network 장르response was not ok');
                }

                const genreResult = await genreResponse.json();
                dispatch(setGenreData(genreResult.genres));
            } catch (error) {
                console.error(error);
            }
        };

        fetchGenres();
    }, []);

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
            if (sortBy === 'popularity.desc') {
                return b.popularity - a.popularity;
            } else if (sortBy === 'vote_average.desc') {
                return b.vote_average - a.vote_average;
            } else if (sortBy === 'first_air_date.desc') {
                return new Date(b.first_air_date) - new Date(a.first_air_date);
            }
            return 0;
        });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        // 사용자가 검색 버튼을 클릭할 때 호출되는 함수
        const sanitizedSearchTerm = searchTerm.toLowerCase().replace(/\s/g, '');
        const searchedMovies = filteredMovies?.filter((movie) =>
            movie.name
                .toLowerCase()
                .replace(/\s/g, '')
                .includes(sanitizedSearchTerm)
        );
        setSearchResults(searchedMovies);

        if (!searchedMovies || searchedMovies.length === 0) {
            alert('일치하는 검색 결과가 없습니다.');
        }
        setSearchTerm('');
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
            setSearchTerm('');
        }
    };

    return (
        <St.Container>
            <St.SelectBox>
                <St.SearchBox>
                    <St.Label htmlFor="search">검색: </St.Label>
                    <St.SearchInput
                        id="search"
                        placeholder=" 영화 제목을 입력하세요"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleEnterKeyPress}
                    />
                    <St.SearchButton onClick={handleSearch}>
                        검색
                    </St.SearchButton>
                </St.SearchBox>
                <St.OptionBox>
                    <St.Label htmlFor="genre">장르 선택: </St.Label>
                    <St.Select
                        id="genre"
                        onChange={(e) =>
                            handleGenreChange(Number(e.target.value))
                        }
                    >
                        <option value={null}>전체</option>
                        {genreData.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </St.Select>
                    <St.Label htmlFor="sort">정렬 선택: </St.Label>
                    <St.Select
                        id="sort"
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        <option value="popularity.desc">인기순</option>
                        <option value="vote_average.desc">평점순</option>
                        <option value="first_air_date.desc">신작순</option>
                    </St.Select>
                </St.OptionBox>
            </St.SelectBox>
            <St.MovieList>
                {searchResults.length > 0
                    ? searchResults.map((item) => (
                          <MovieCard
                              key={item.id}
                              movie={item}
                              genres={genreData}
                          />
                      ))
                    : filteredMovies.map((item) => (
                          <MovieCard
                              key={item.id}
                              movie={item}
                              genres={genreData}
                          />
                      ))}
            </St.MovieList>
            <St.LoadMoreButton onClick={handleLoadMore}>
                더보기
            </St.LoadMoreButton>
        </St.Container>
    );
};

export default Main;
