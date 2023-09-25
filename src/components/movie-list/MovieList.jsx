import React, { useEffect, useState } from "react";
import axios from "axios";
import "./movie-list.scss";
import Card from "../card/Card";
import ReactPaginate from "react-paginate";

import { HiMagnifyingGlass } from "react-icons/hi2"






const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("AÑO");
  const [ascdesc, setAscdesc] = useState("");
  const [type, setType] = useState("");

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  const handleInput = (e) => {
    const newValue = e.target.value;
    setTimeout(() => {
      setKeyword(newValue);
    }, 500);
  };

  const handleReset = (e) => {
    window.location.reload();
  };

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const handleOrder = (e) => {
    if (e.target.value === "RECIENTE") {
      setAscdesc("year.decr");
    } else {
      setAscdesc("year.incr");
    }
  };

  const handleTypes = (e) => {
    setType(e.target.value);
  };


  const fetchMoviesByName = async (keyword, page) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${keyword}?page=${page}`,
        params: {
          exact: "false",
          startYear: "2010",
          endYear: "2023",
          sort: `${ascdesc}`,
        },
        headers: {
          "X-RapidAPI-Key":
            "011271e1efmshd2ff1ab72a2356bp1f5e61jsnf423094948a1",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      });
      setMovies(response.data);
      setIsLoading(false);
      setDataLoaded(true);
    } catch (error) {
      console.log("error al obtener películas", error);
      setIsLoading(false);
    }
  };

  const fetchMoviesByNameAndType = async (keyword, page) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${keyword}?page=${page}`,
        params: {
          exact: "false",
          startYear: "2010",
          endYear: "2023",
          sort: `${ascdesc}`,

          titleType: `${type}`,
        },
        headers: {
          "X-RapidAPI-Key":
            "011271e1efmshd2ff1ab72a2356bp1f5e61jsnf423094948a1",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      });
      setMovies(response.data);
      setIsLoading(false);
      setDataLoaded(true);
    } catch (error) {
      console.log("error al obtener películas", error);
      setIsLoading(false);
    }
  };

  const fetchMoviesByNameAndYear = async (keyword, page) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${keyword}?page=${page}`,
        params: {
          exact: "false",
          year: `${year}`,
        },
        headers: {
          "X-RapidAPI-Key":
            "011271e1efmshd2ff1ab72a2356bp1f5e61jsnf423094948a1",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      });
      setMovies(response.data);
      setIsLoading(false);
      setDataLoaded(true);
    } catch (error) {
      console.log("error al obtener películas", error);
      setIsLoading(false);
    }
  };

  

  const fetchMovies = async (page) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `https://moviesdatabase.p.rapidapi.com/titles?page=${page}`,
        params: {
          startYear: "2010",
          endYear: "2023",
          sort: `${ascdesc}`,
        },
        headers: {
          "X-RapidAPI-Key":
            "011271e1efmshd2ff1ab72a2356bp1f5e61jsnf423094948a1",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      });
      setMovies(response.data);
      setIsLoading(false);
      setDataLoaded(true);
    } catch (error) {
      console.log("error al obtener películas", error);
      setIsLoading(false);
    }
  };

  const fetchMoviesByType = async (page, year) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `https://moviesdatabase.p.rapidapi.com/titles?year=${year}&page=${page}`,
        params: {
          startYear: "2010",
          endYear: "2023",
          sort: `${ascdesc}`,
          titleType: `${type}`,
          year: `${year}`,
        },
        headers: {
          "X-RapidAPI-Key":
            "011271e1efmshd2ff1ab72a2356bp1f5e61jsnf423094948a1",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      });
      setMovies(response.data);
      setIsLoading(false);
      setDataLoaded(true);
    } catch (error) {
      console.log("error al obtener películas", error);
      setIsLoading(false);
    }
  };

  const fetchMoviesByYear = async (year, page) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `https://moviesdatabase.p.rapidapi.com/titles?page=${page}`,
        params: {
          year: `${year}`,
        },
        headers: {
          "X-RapidAPI-Key":
            "011271e1efmshd2ff1ab72a2356bp1f5e61jsnf423094948a1",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      });
      setMovies(response.data);
      setIsLoading(false);
      setDataLoaded(true);
    } catch (error) {
      console.log("error al obtener películas", error);
      setIsLoading(false);
    }
  };

  const fetchMoviesByYearandType = async (year, page) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `https://moviesdatabase.p.rapidapi.com/titles?page=${page}`,
        params: {
          year: `${year}`,
          titleType: `${type}`,
        },
        headers: {
          "X-RapidAPI-Key":
            "011271e1efmshd2ff1ab72a2356bp1f5e61jsnf423094948a1",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      });
      setMovies(response.data);
      setIsLoading(false);
      setDataLoaded(true);
    } catch (error) {
      console.log("error al obtener películas", error);
      setIsLoading(false);
    }
  };

  //UseEffect para que cuando apenas se monte la pagina me traiga las peliculas, se actualiza cuando se modifica page.
  useEffect(() => {
    if (keyword && year !== "AÑO") {
      fetchMoviesByNameAndYear(keyword, page);
    } else if (keyword && type !== "") {
      fetchMoviesByNameAndType(keyword, page);
    } else if (keyword) {
      fetchMoviesByName(keyword, page);
    } else if (year !=="AÑO" && type==="todo") {
      fetchMoviesByYear(year,page)
    }
    else if (year !== "AÑO" && type !== "") {
      fetchMoviesByYearandType(year, page);
    } else if (year !== "AÑO") {
      fetchMoviesByYear(year, page);
    } else if (type !== "") {
      fetchMoviesByType(page);
    } else {
      fetchMovies(page);
    }
  }, [page, keyword, year, ascdesc, type]);

  //
  const years = ["AÑO", 2021, 2022, 2023];
  const ordenar = ["ORDENAR ", "RECIENTE", "ANTIGUO"];

  return (
    <div className="movie__list">
      <div className="searchbar-container">
        <div className="searchbar-icon">
        <HiMagnifyingGlass />
        </div>
        <input
          className="searchbar"
          type="text"
          placeholder="What do you want to watch?" 
          onChange={(e)=> handleInput(e)}
        />
      
        </div>
        <div className="filter-container">
        <select className="filter-year" key={year} value={year} onChange={handleYear}>
          {years.map((year) => (
            <option className="sectiontext" key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select className="filter-order" key={ascdesc} value={ascdesc} onChange={handleOrder}>
          {ordenar.map((orden) => (
            <option className="sectiontext" key={orden} value={orden}>
              {orden}
            </option>
          ))}
        </select>
        <select className="filter-movies" onChange={handleTypes}>
          <option value="todo">TODO</option>
          <option className="sectiontext" value="movie">PELICULAS</option>
          <option className="sectiontext" value="tvSeries">SERIES</option>
        </select>

        <button className="reset" onClick={handleReset}>LIMPIAR</button>
      </div>

      

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
