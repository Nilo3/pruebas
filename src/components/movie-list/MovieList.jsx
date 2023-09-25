import React, { useEffect, useState } from "react";
import axios from "axios";
import "./movie-list.scss";
import Card from "../card/Card";
import ReactPaginate from "react-paginate";

import { HiMagnifyingGlass } from "react-icons/hi2"



const MovieList = () => {


  // SETEO TODOS LOS ESTADOS CON LOS QUE VOY A TRABAJAR.
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("AÑO");
  const [ascdesc, setAscdesc] = useState("");
  const [type, setType] = useState("");


  //FUNCION PARA EL MANEJO DE PAGINADO
  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };


  //FUNCION PARA QUE LA SEARCHBAR SE DEMORE ENTRE EL INPUT DEL USUARIO Y EL SETEO DE LA KEYWORD A BUSCAR
  const handleInput = (e) => {
    const newValue = e.target.value;
    setTimeout(() => {
      setKeyword(newValue);
    }, 500);
  };

  // FUNCION QUE RESETEA TODOS LOS FILTROS
  const handleReset = (e) => {
    window.location.reload();
  };

  // FUNCION QUE SETEA EL AÑO SELECCIONADO POR EL USUARIO
  const handleYear = (e) => {
    setYear(e.target.value);
  };

  // FUNCION QUE SETEA EL ORDENAMIENTO SEGUN AÑO DE SALIDA DE LA PELICULA
  const handleOrder = (e) => {
    if (e.target.value === "RECIENTE") {
      setAscdesc("year.decr");
    } else {
      setAscdesc("year.incr");
    }
  };



  // FUNCION QUE SETEA EL TIPO DE CONTENIDO MOVIE/SERIE
  const handleTypes = (e) => {
    setType(e.target.value);
  };



  //////////    SOLICITUDES A LA API, LAS REALIZO DESDE EL COMPONENTE PARA TRABAJAR UNICAMENTE CON ESTADOS LOCALES      ////

  // SE QUE DEJAR LAS APIKEY EN EL COMPONENTE ES UNA MUY MALA PRACTICA, PERO TUVE PROBLEMAS DE WEBPACK QUE NO PUDE SOLUCIONAR Y NO ME DEJO USARLAS DESDE EL .ENV
  // EN ESTE CASO AL SER ALGO TECNICO, ME CENTRE MAS EN LA FUNCIONALIDAD Y EN EL TIEMPO, MAS QUE EN LA SEGURIDAD. 

  // SOLICITUD A LA API DE PELICULAS POR NOMBRE
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


  // SOLICITUD A LA API DE PELICULAS POR NOMBRE Y TIPO
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


  // SOLICITUD A LA API DE PELICULAS POR NOMBRE Y AÑO
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

  
  // SOLICITUD DE PELICULAS A LA API, ES LA SOLICITUD INICIAL CON LA QUE SE CARGA LA PAGINA
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


  // SOLICITUD A LA API DE PELICULAS POR TIPO 
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


  // SOLICITUD A LA API DE PELICULAS POR AÑO
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


  // SOLICITUD A LA API DE PELICULAS POR AÑO Y TIPO
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

  //UseEffect ES QUIEN MANEJA CASI TODO, CUANDO APENAS SE MONTE LA PAGINA Y NO SE CUMPLAN LAS CONDICIONES NOS VA A IR DEJANDO FILTRAR O NO. 

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

  // CONSTANTES PARA MAPEARLAS
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
