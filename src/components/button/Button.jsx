import React from "react";
import "./button.scss"
import { AiFillPlayCircle } from "react-icons/ai"


const Button = () => {
    return (
        <button className="btn">
           <AiFillPlayCircle className="play" /> WATCH TRAILER
        </button>
    )
}

export default Button