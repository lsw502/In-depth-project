// PopularSlider.jsx
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const PopularSlider = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPopularMovies = async () => {
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
          `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=ko-KR&page=1&_limit=10&sort_by=popularity.desc&with_origin_country=JP`,
          movieOptions
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const movieResult = await response.json();
        setPopularMovies(movieResult.results);
      } catch (error) {
        console.error(error);
      }
    };

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
          throw new Error("Network 장르 response was not ok");
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

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < popularMovies.length ? prevIndex + 1 : 0
    );
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : popularMovies.length - 1
    );
  };

  return (
    <div style={styles.container}>
      <h2>인기작 슬라이더</h2>
      <div className="popular-slider" style={styles.popularSlider}>
        {popularMovies.length > 0 && genres.length > 0 && (
          <div style={styles.movieContainer}>
            <div style={styles.movieImageContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${popularMovies[currentIndex].poster_path}`}
                alt={popularMovies[currentIndex].name}
                style={styles.movieImage}
              />
            </div>
            <div style={styles.movieDetails}>
              <h3>{popularMovies[currentIndex].name}</h3>
              <p>평점: {popularMovies[currentIndex].vote_average}</p>
              <p>
                장르:{" "}
                {popularMovies[currentIndex].genre_ids
                  .map((genreId) => {
                    const foundGenre = genres.find(
                      (genre) => genre.id === genreId
                    );
                    return foundGenre ? foundGenre.name : "알 수 없는 장르";
                  })
                  .join(", ")}
              </p>
              <p>{popularMovies[currentIndex].overview}</p>
            </div>
          </div>
        )}
      </div>
      <button onClick={handlePrevSlide}>이전</button>
      <button onClick={handleNextSlide}>다음</button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  popularSlider: {
    display: "flex",
    gap: "1rem",
    height: "500px",
    overflow: "hidden",
  },
  movieContainer: {
    display: "flex",
    maxWidth: "800px", // 최대 너비를 설정하여 화면 가운데에 정렬
  },
  movieImageContainer: {
    flex: "0 0 50%", // 이미지 컨테이너가 왼쪽에 50% 차지
  },
  movieImage: {
    width: "100%", // 이미지를 100%로 설정하여 온전히 보이도록 함
    height: "auto",
  },
  movieDetails: {
    flex: "0 0 50%", // 내용 컨테이너가 오른쪽에 50% 차지
    marginLeft: "1rem",
  },
};

export default PopularSlider;
