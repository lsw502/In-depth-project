import React from "react";
import * as St from "./mainStyles";

function MovieCard({ movie, genres }) {
  function findGenreName(genreId) {
    const foundGenre = genres?.find((genre) => genre.id === genreId);
    return foundGenre ? foundGenre.name : "알 수 없는 장르";
  }

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <St.MovieCardContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <St.MovieCardImage
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.name}
        style={{ filter: isHovered ? "blur(3px)" : "none" }}
      />
      <St.MovieCardDetailsOverlay isVisible={isHovered}>
        <h3>{movie.name}</h3>
        <p>평점: {movie.vote_average}</p>
        <p>
          장르:{" "}
          {movie.genre_ids.map((genreId) => findGenreName(genreId)).join(", ")}
        </p>
        <p>내용: {movie.overview}</p>
      </St.MovieCardDetailsOverlay>
    </St.MovieCardContainer>
  );
}

export default MovieCard;
