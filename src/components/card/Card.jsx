import React, {useEffect, useState} from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "./card.scss"


const Card = ({ primaryImage, originalTitleText, releaseYear, titleType }) => {

    const [isLoading, setIsLoading] = useState(true)

   

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []) 

    if (!primaryImage || !primaryImage.url) {
      // Si primaryImage.url es null, no renderizamos el componente Card
      return null;
    }

    return <>
    {
        isLoading
        ?
        <div className="cards">
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :
        
            <div className="cards">
                <img className="cards__img" src={primaryImage.url} alt="test"/>
                <div className="cards__overlay">
                <div className="card__title">{originalTitleText.text}</div>
                    <div className="card__runtime">
                        {releaseYear.year}
                        
                    </div>
                    <div className="card__description">{titleType.text}</div>
                </div>
                
            </div>
            
       
    }
    </>
}

export default Card