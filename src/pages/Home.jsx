import React from "react";
import Header from "../components/header/Header";
import MovieSlide from "../components/movie-slide/MovieSlide";
import MovieList from "../components/movie-list/MovieList";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <MovieSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section_header mb-2"></div>
          <MovieList />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
