import React, { useEffect, useState } from "react";
import axios from "axios";
import "./movie-list.scss";
import Card from "../card/Card";
import ReactPaginate from "react-paginate"

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [page, setPage] = useState(1)

 

  const handlePageClick = (data) => {
    setPage (data.selected+1)
  
  }

  useEffect(() => {
    const getMovies = {
      method: 'GET',
      url: `https://moviesdatabase.p.rapidapi.com/titles?page=${page}`,
      headers: {
        'X-RapidAPI-Key': '011271e1efmshd2ff1ab72a2356bp1f5e61jsnf423094948a1',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };

    const fetchMovies = async (page) => {
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
  }, [page]);

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
      <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={5}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-link"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
      />
    </div>
  );
};

export default MovieList;
