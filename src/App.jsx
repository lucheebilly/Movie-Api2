import React, { useEffect, useState } from 'react';
import Search from './components/Search.jsx';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMovies(data.results || []);
      setErrorMessage('');
    } catch (error) {
      console.error(`Error Fetching Movies: ${error}`);
      setErrorMessage('Error Fetching Movies. Please try again later');
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="pattern" />

      <div className="wrapper max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <img
            src="/Movie-Api2/logo.png"
            alt="Logo"
            className="mx-auto mb-4 w-24 sm:w-32 max-w-full object-contain"
          />
          <img
            src="Movie-Api2/hero.png"
            alt="Hero Banner"
            className="w-full rounded-md mb-6 max-w-full object-contain"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
            Find <span className="text-gradient">Movies</span> You Will Enjoy without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">All Movies</h2>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {movies.length === 0 && !errorMessage && <p>No movies to display.</p>}
            {movies.map(movie => (
              <div
                key={movie.id}
                className="movie-card bg-gray-800 rounded-lg p-2 flex flex-col items-center"
                style={{ maxWidth: '150px' }}
              >
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-md mb-1 max-w-full object-contain"
                  />
                )}

                <div className="flex items-center mb-1">
                  <img
                    src="/Movie-Api2/star.svg"
                    alt="Star"
                    className="w-4 h-4 mr-1 flex-shrink-0"
                  />

                  <h3 className="text-xs sm:text-sm font-semibold truncate max-w-[110px]">
                    {movie.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-300">Release Date: {movie.release_date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;
