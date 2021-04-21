// Imports
import Header from "./common/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Demo1 from "./pages/Demo1";
import React from "react";
import Demo2 from "./pages/Demo2";
import Demo3 from "./pages/Demo3";
import CustomDemo from "./pages/CustomDemo";

export default function TestSite() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/demo1">
                    <Demo1 />
                </Route>
                <Route path="/demo2">
                    <Demo2 />
                </Route>
                <Route path="/demo3">
                    <Demo3 />
                </Route>
                <Route path="/custom">
                    <CustomDemo />
                </Route>
            </Switch>
        </Router>
    );
}
