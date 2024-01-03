import * as St from './mainStyles';
import React, { useEffect, useState } from 'react';

const PopularSlider = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        const fetchPopularMovies = async () => {
            const movieOptions = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${apiKey}`
                }
            };

            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=ko-KR&page=1&_limit=10&sort_by=popularity.desc&with_origin_country=JP`,
                    movieOptions
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const movieResult = await response.json();
                setPopularMovies(movieResult.results);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchGenres = async () => {
            const genreOptions = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${apiKey}`
                }
            };

            try {
                const genreResponse = await fetch(
                    'https://api.themoviedb.org/3/genre/tv/list?language=ko',
                    genreOptions
                );

                if (!genreResponse.ok) {
                    throw new Error('Network 장르 response was not ok');
                }

                const genreResult = await genreResponse.json();
                setGenres(genreResult.genres);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPopularMovies();
        fetchGenres();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleNextSlide();
        }, 3000);

        return () => clearInterval(intervalId);
    }, [popularMovies, currentIndex]);

    const handleNextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 < popularMovies.length ? prevIndex + 1 : 0
        );
        setActiveTab((prevIndex) =>
            prevIndex + 1 < popularMovies.length ? prevIndex + 1 : 0
        );
    };

    const handleTabClick = (index) => {
        setActiveTab(index);
        setCurrentIndex(index);
    };

    return (
        <St.SlideContainer>
            <St.SlidePopularSlider>
                {popularMovies.length > 0 && genres.length > 0 && (
                    <St.SlideMovieContainer>
                        <St.SlideMovieImageContainer>
                            <St.SlideMovieImage
                                src={`https://image.tmdb.org/t/p/w500/${popularMovies[currentIndex].poster_path}`}
                                alt={popularMovies[currentIndex].name}
                            />
                        </St.SlideMovieImageContainer>
                        <St.SlideMovieDetails>
                            <h3>{popularMovies[currentIndex].name}</h3>
                            <p>
                                평점: {popularMovies[currentIndex].vote_average}
                            </p>
                            <p>
                                장르:{' '}
                                {popularMovies[currentIndex].genre_ids.map(
                                    (genreId, genreIndex) => {
                                        const foundGenre = genres.find(
                                            (genre) => genre.id === genreId
                                        );
                                        const genreName = foundGenre
                                            ? foundGenre.name
                                            : '알 수 없는 장르';

                                        return (
                                            <St.GenreCircle key={genreIndex}>
                                                {genreName}
                                            </St.GenreCircle>
                                        );
                                    }
                                )}
                            </p>
                            <p>{popularMovies[currentIndex].overview}</p>
                        </St.SlideMovieDetails>
                    </St.SlideMovieContainer>
                )}
            </St.SlidePopularSlider>
            <St.SlideTabContainer>
                {popularMovies.map((_, index) => (
                    <St.SlideTab
                        key={index}
                        onClick={() => handleTabClick(index)}
                        active={activeTab === index}
                    />
                ))}
            </St.SlideTabContainer>
        </St.SlideContainer>
    );
};

export default PopularSlider;
