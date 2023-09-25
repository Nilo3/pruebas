import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.scss";

const Card = ({ primaryImage, originalTitleText, releaseYear, titleType }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="cards">
      {isLoading ? (
        <SkeletonTheme color="#202020" highlightColor="#444">
          <Skeleton height={300} duration={2} />
        </SkeletonTheme>
      ) : (
        <>
        <div className="card__container">
        <img
            className="cards__img"
            src={primaryImage && primaryImage.url ? primaryImage.url : "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg"}
            alt="test"
          />
          <div className="card__description">{titleType.text.toUpperCase()}</div>
        </div>
         
          <div className="card__title">
            {originalTitleText && originalTitleText.text}
          </div>
          {releaseYear && releaseYear.year ? (
            <div>{releaseYear.year}</div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Card;
