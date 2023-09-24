import React from "react";
import "./movie-slide.scss";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss"; 
import Button from "../button/Button"

import it from "../../assets/It.jpeg";
import marvel from "../../assets/marvel.jpeg";
import starwars from "../../assets/starwars.jpg";

const MovieSlide = () => {
  const images = [
    {
      img: marvel,
      title: "Avengers",
      text: "saraza",
    },
    {
      img: starwars,
      title: "Starwars",
      text: "saraza2",
    },
    {
      img: it,
      title: "It",
      text: "saraza3",
    },
  ];

  SwiperCore.use([Autoplay]);

  return (
    <div className="movie-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <div className="slide-container">
              <img src={image.img} alt="test" />
              <div className="text-container">
                <p className="slide-title">{image.title}</p>
                <p className="slide-text">{image.text}</p>
                <Button />
              </div>
             
            </div>
            
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlide;
