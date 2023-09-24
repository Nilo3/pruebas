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
  const [keyword, setKeyword] = useState("")
  const [year, setYear] = useState("Año")
  const [ascdesc, setAscdesc] = useState("")
  


 

  const handlePageClick = (data) => {
    setPage (data.selected+1)
  }

  const handleInput = (e) => {
    setKeyword(e.target.value)
  }

  const handleReset = (e) => {
    window.location.reload()
  }

  const handleYear = (e) => {
    setYear(e.target.value)
  }

  const handleOrder = (e) => {
    if(e.target.value === "Reciente" ){
      setAscdesc("year.decr")
    }else{
      setAscdesc("year.incr")
    }
  }

  console.log(ascdesc);



  const fetchMoviesByName = async (keyword, ascdesc ) => {
    try {
      const response = await axios.request({
        method: 'GET',
        url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${keyword}`,
        params: {
          exact: 'false',
          startYear: '2010',
          endYear: '2023',
          sort: `${ascdesc}`
        },
        headers: {
          'X-RapidAPI-Key': '011271e1efmshd2ff1ab72a2356bp1f5e61jsnf423094948a1',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
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
        method: 'GET',
        url: `https://moviesdatabase.p.rapidapi.com/titles?page=${page}`,
        params: {
          startYear: '2010',
          endYear: '2023',
          sort: `${ascdesc}`,
          
        },
        headers: {
          'X-RapidAPI-Key': '011271e1efmshd2ff1ab72a2356bp1f5e61jsnf423094948a1',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      });
      setMovies(response.data)
      setIsLoading(false);
      setDataLoaded(true);
    } catch (error) {
      console.log("error al obtener películas", error);
      setIsLoading(false);
    }
  }
  
  const fetchMoviesByYear = async (year) => {
    try {
      const response = await axios.request({
        method: 'GET',
        url: `https://moviesdatabase.p.rapidapi.com/titles`,
        params: {
          year: `${year}`
        },
        headers: {
          'X-RapidAPI-Key': '011271e1efmshd2ff1ab72a2356bp1f5e61jsnf423094948a1',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      });
      setMovies(response.data)
      setIsLoading(false);
      setDataLoaded(true);
    } catch (error) {
      console.log("error al obtener películas", error);
      setIsLoading(false);
    }
  }


  //UseEffect para que cuando apenas se monte la pagina me traiga las peliculas, se actualiza cuando se modifica page.
  useEffect(() => {
   if(keyword) {
    fetchMoviesByName(keyword, ascdesc)
   } else if(year!=="Año") {
    fetchMoviesByYear(year)
   }else{
    fetchMovies(page)
   }
  }, [page, keyword, year, ascdesc]);

  



//
const years = ["Año", 2021,2022,2023]
const ordenar = ["Ordenar", "Reciente", "Antiguo"]
 

  return (
    <div className="movie__list">
      <div className="searchbar-container">
      <input className="searchbar" type="text" placeholder="What do you want to watch"   onKeyDown={(e) => e.key === "Enter" && handleInput(e)}  />
      
       
        <select key={year} value={year} onChange={handleYear}>
          {
            years.map((year)=>(
              <option key={year} value={year}>{year}</option>
            ))
          }
        </select>
          <select key={ascdesc} value={ascdesc} onChange={handleOrder}>
            {
              ordenar.map((orden)=>(
                <option key={orden} value={orden}>{orden}</option>
              ))
            }
          </select>
    
      
      <button onClick={handleReset}>Limpiar</button>
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
