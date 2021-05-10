// Imports
import Header from "./common/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Demo1 from "./pages/DemoFood";
import React, { useState } from "react";
import Demo2 from "./pages/DemoShelter";
import Demo3 from "./pages/DemoClothing";
import CustomDemo from "./pages/CustomDemo";
import Widget from "../widget/Widget";
import UserContext from "../general/user/UserContext";

export default function TestSite() {
    // Setting default user
    const [user, setUser] = useState<User>({
        location: {
            lat: undefined,
            lng: undefined,
        },
    });

    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/demo/food">
                    <Demo1 />
                </Route>
                <Route path="/demo/shelter">
                    <Demo2 />
                </Route>
                <Route path="/demo/clothing">
                    <Demo3 />
                </Route>
                <Route path="/demo/custom">
                    <CustomDemo />
                </Route>
            </Switch>
            <UserContext.Provider value={{ user, setUser }}>
                <Widget />
            </UserContext.Provider>
        </Router>
    );
}
