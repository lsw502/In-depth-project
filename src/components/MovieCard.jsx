import React from "react";

function MovieCard({ movie, genres }) {
  function findGenreName(genreId) {
    const foundGenre = genres?.find((genre) => genre.id === genreId);
    return foundGenre ? foundGenre.name : "알 수 없는 장르";
  }
  return (
    <div style={styles.movieCard}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.name}
        style={styles.movieImage}
      />
      <div style={styles.movieDetails}>
        <h3>{movie.name}</h3>
        <p>평점: {movie.vote_average}</p>
        <p>
          장르:{" "}
          {movie.genre_ids.map((genreId) => findGenreName(genreId)).join(", ")}
        </p>
      </div>
    </div>
  );
}

const styles = {
  movieCard: {
    width: "200px",
    border: "1px solid #ddd",
    padding: "10px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px",
  },
  movieImage: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "20px",
  },
  movieDetails: {
    marginTop: "10px",
  },
};

export default MovieCard;
