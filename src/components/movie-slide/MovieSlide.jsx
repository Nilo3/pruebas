import React from "react";
import "./movie-slide.scss";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import Button from "../button/Button";

import it from "../../assets/It.jpeg";
import marvel from "../../assets/marvel.jpeg";
import starwars from "../../assets/starwars.jpg";

const MovieSlide = () => {
  const images = [
    {
      img: marvel,
      title: "Avengers :",
      text: "Los Avengers se unen para salvar el mundo de la amenaza de Loki y su ejército alienígena.",
    },
    {
      img: starwars,
      title: "Starwars :",
      text: "Rey y Finn se embarcan en una aventura para ayudar a la Resistencia a luchar contra la Primera Orden.",
    },
    {
      img: it,
      title: "It :",
      text: "El Club de los Perdedores regresa a Derry para enfrentar nuevamente a Pennywise.",
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
