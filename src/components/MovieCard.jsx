import React from "react";
import * as St from "../components/styles";

function MovieCard({ movie, genres }) {
  function findGenreName(genreId) {
    const foundGenre = genres?.find((genre) => genre.id === genreId);
    return foundGenre ? foundGenre.name : "알 수 없는 장르";
  }
  return (
    <St.MovieCardContainer>
      <St.MovieCardImage
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.name}
      />
      <St.MovieCardDetails>
        <h3>{movie.name}</h3>
        <p>평점: {movie.vote_average}</p>
        <p>
          장르:{" "}
          {movie.genre_ids.map((genreId) => findGenreName(genreId)).join(", ")}
        </p>
      </St.MovieCardDetails>
    </St.MovieCardContainer>
  );
}

export default MovieCard;
