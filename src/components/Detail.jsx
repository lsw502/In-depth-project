import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Detail = () => {
    const { movieId } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const [videos, setVideos] = useState([]);
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        const fetchMovieDetail = async () => {
            const movieDetailOptions = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${apiKey}`
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
        <MainContainer>
            <Container>
                <MovieTitle>{movieDetail.name}</MovieTitle>
                <MovieImage
                    src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
                    alt={movieDetail.name}
                />
                <MovieInfo>평점: {movieDetail.vote_average}</MovieInfo>
                <MovieInfo>
                    장르:{' '}
                    {movieDetail.genres.map((genre) => genre.name).join(', ')}
                </MovieInfo>
                <MovieInfo>내용: {movieDetail.overview}</MovieInfo>
            </Container>
            <VideoContainer>
                {videos.length > 0 ? (
                    <>
                        <VideoTitle>동영상</VideoTitle>
                        <VideoList>
                            {videos.map((video) => (
                                <VideoItem key={video.key}>
                                    <VideoFrame
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        title={video.name}
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></VideoFrame>
                                </VideoItem>
                            ))}
                        </VideoList>
                    </>
                ) : (
                    <NoVideoMessage>영상이 없습니다.</NoVideoMessage>
                )}
            </VideoContainer>
        </MainContainer>
    );
};

export default Detail;

const MainContainer = styled.div`
    display: flex;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    flex-wrap: wrap;
`;

const Container = styled.div`
    max-width: 400px;
    padding: 20px;
    width: 1000px;
`;

const MovieTitle = styled.h2`
    font-size: 28px;
    margin-bottom: 10px;
`;

const MovieImage = styled.img`
    max-width: 100%;
    height: auto;
    margin-bottom: 10px;
`;

const MovieInfo = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
    width: 750px;
`;

const VideoContainer = styled.div`
    max-width: 800px;
    padding: 20px;
    width: 1000px;
`;

const VideoTitle = styled.h3`
    font-size: 20px;
    margin-bottom: 10px;
`;

const VideoList = styled.ul`
    list-style: none;
    padding: 0;
`;

const VideoItem = styled.li`
    margin-bottom: 20px;
`;

const VideoFrame = styled.iframe`
    width: 100%;
    height: 315px;
`;

const NoVideoMessage = styled.h1`
    font-size: 24px;
    margin-top: 20px;
`;
