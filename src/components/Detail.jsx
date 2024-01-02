import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const { movieId } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            const movieDetailOptions = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmEyYzIzMWRjMTQxMGEzNjk3ZWEzOWQyMjY2M2IwZiIsInN1YiI6IjY1MzBlZmMzNTFhNjRlMDBjOGZkY2I5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jYFT5VOAZYR9SPBGGB16_GUZgiU7Bmkvz6G-5Qwiw48'
                }
            };

            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/tv/${movieId}?language=ko-KR`,
                    movieDetailOptions
                );

                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다');
                }

                const movieDetailResult = await response.json();
                setMovieDetail(movieDetailResult);

                const videosResponse = await fetch(
                    `https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`,
                    movieDetailOptions
                );

                if (videosResponse.ok) {
                    const videosResult = await videosResponse.json();
                    setVideos(videosResult.results);
                } else {
                    console.error('비디오를 가져오는데 실패했습니다');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovieDetail();
    }, [movieId]);

    if (!movieDetail) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <h2>{movieDetail.name}</h2>
            <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
                alt={movieDetail.name}
                style={{ maxWidth: '100%', height: 'auto' }}
            />
            <p>평점: {movieDetail.vote_average}</p>
            <p>
                장르: {movieDetail.genres.map((genre) => genre.name).join(', ')}
            </p>
            <p>내용: {movieDetail.overview}</p>

            {videos.length > 0 ? (
                <div>
                    <h3>동영상</h3>
                    <ul>
                        {videos.map((video) => (
                            <li key={video.key}>
                                <iframe
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title={video.name}
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <h1>영상이 없습니다.</h1>
            )}
        </div>
    );
};

export default Detail;
