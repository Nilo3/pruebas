import React, { useEffect, useState } from "react";
import axios from "axios";
import "./movie-list.scss";
import Card from "../card/Card";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const getMovies = {
      method: 'GET',
      url: 'https://moviesdatabase.p.rapidapi.com/titles',
      headers: {
        'X-RapidAPI-Key': '011271e1efmshd2ff1ab72a2356bp1f5e61jsnf423094948a1',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await axios.request(getMovies);
        setMovies(response.data);
        setIsLoading(false);
        setDataLoaded(true);
      } catch (error) {
        console.log("error al obtener peliculas", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  console.log("esto es movies", movies.results);

  return (
    <div className="movie__list">
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : dataLoaded ? (
        <div className="list__cards">
          {movies.results.map((movie) => (
            <Card
            key={movie._id}
            primaryImage={movie.primaryImage}
            originalTitleText={movie.originalTitleText}
            releaseYear={movie.releaseYear}
            titleType={movie.titleType}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MovieList;
