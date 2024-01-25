import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// const movie1 = {
//   Title: "Viet Costas - Citizenship: Undefined",
//   Year: "2014",
//   imdbID: "tt3838986",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BY2NhNzEzZDctZDkxYy00MmZhLWIyN2UtNWEzOTA0Y2VhYWY5XkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SX300.jpg",
// };

const API_URL = "http://www.omdbapi.com?apikey=f4a7f049";
function App() {
  const [Movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  
  useEffect(() => {
    searchMovies();
  }, []);


  return (
    <div className="app">
      <h1>BwatchWave</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>

      {Movies?.length > 0 ? (
        <div className="container">
          {Movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
