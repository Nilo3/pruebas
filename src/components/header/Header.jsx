import React from "react";

import "./header.scss";

import logo from "../../assets/logo.png"


const Header = () => {
    return (
        <div className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <p className="header__text">MovieBox</p>
            </div>
        </div>
    )
}

export default Header