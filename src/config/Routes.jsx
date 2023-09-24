import React from "react";

import { Route, Switch } from "react-router-dom"

import Home from "../pages/Home"
import Catalog from "../pages/Catalog"
import Detail from "../pages/Detaill";

const Routes = () => {
    return (
        <Switch>
            <Route path="/" />
        </Switch>
    )
}

//Ver si lo necesito


export default Routes