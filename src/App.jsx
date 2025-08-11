import React, { useEffect, useState } from "react";

const API_KEY = "YOUR_TMDB_API_KEY"; // Replace with your TMDB API key

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="bg-gray-900 min-h-screen text-white p-4">
      {/* Logo */}
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="Logo"
        className="mx-auto mb-4 w-24 sm:w-32 max-w-full object-contain"
      />

      {/* Hero image */}
      <img
        src={`${import.meta.env.BASE_URL}hero.png`}
        alt="Hero Banner"
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold mb-6 text-center">
        Popular Movies
      </h1>

      {/* Movies grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 p-3 rounded-lg shadow-lg flex flex-col"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg mb-3 h-72 object-cover"
            />

            <div className="mt-auto">
              {/* Movie title */}
              <h2 className="text-lg font-semibold">{movie.title}</h2>

              {/* Star rating */}
              <div className="flex items-center mt-1">
                <img
                  src={`${import.meta.env.BASE_URL}star.svg`}
                  alt="Star rating"
                  className="w-4 h-4 mr-1"
                />
                <span>{movie.vote_average}</span>
              </div>

              {/* Release date */}
              <p className="text-gray-400 text-sm mt-1">
                {movie.release_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;
