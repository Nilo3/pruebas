import React from "react";
import "./footer.scss"
import { FaFacebookSquare } from 'react-icons/fa';
import { BsInstagram, BsTwitter } from "react-icons/bs"
import { AiFillYoutube }  from "react-icons/ai"



const Footer = () =>{
    return (
        <footer>
            <div className="social-icons-container">
            <a className="space"><FaFacebookSquare /></a>
            <a className="space"><BsInstagram /></a>
            <a className="space"><BsTwitter /></a>
            <a className="space"><AiFillYoutube /></a>
        </div>
            <ul className="footer-menu-container">
                <li className="menu-item">Conditions of Use</li>
                <li className="menu-item">Privacy & Policy</li>
                <li className="menu-item">Press Room</li>
            </ul>
            <span className="copyright">&copy;2021, MovieBox by Adriana Eka Prayudha</span>
        </footer>
    )
}


export default Footer