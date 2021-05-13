// Import
import React, { useEffect, useState } from "react";
import "./App.styles.ts";

// Components
import Header from "./components/Header/Header";
import Widget from "./components/Widget/Widget";

// Meta
import { Helmet, HelmetProvider } from "react-helmet-async";

//Styling
import GlobalStyle from "./App.styles";

// Routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Pages
import Start from "./pages/Start/Start";
import Demo from "./pages/Demos/Demo";
import CustomDemo from "./pages/Demos/CustomDemo/CustomDemo";
import Home from "./pages/Home/Home";

// Types
import { Location } from "./types";

// Utils
import { linkOut } from "./helper/api";
import LocationContext from "./helper/LocationContext/LocationContext";

// Component
function App() {
    const [location, setLocation] = useState<Location>({
        lat: undefined,
        lng: undefined,
        distance: undefined,
    });
    useEffect(() => {
        // Calls link out on page close
        window.onbeforeunload = linkOut;
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>CORDS</title>
                <meta name="description" content="CORDS project website" />
                <meta name="keywords" content="help, cords, youth, search" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, minimum-scale=1"
                />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto&family=Source+Sans+Pro&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <GlobalStyle />
            <Start />
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/demo/food">
                        <Demo
                            title="Food"
                            description="Free or low-cost food to individuals and families in need on an on-going, seasonal, and emergency basis."
                        />
                    </Route>
                    <Route path="/demo/shelter">
                        <Demo
                            title="Shelter"
                            description="We provide temporary accommodation and related support services that assist people to move into housing."
                        />
                    </Route>
                    <Route path="/demo/clothing">
                        <Demo
                            title="Clothing"
                            description="Drop-off site for donations of used/unwanted clothing."
                        />
                    </Route>
                    <Route path="/demo/custom">
                        <CustomDemo />
                    </Route>
                </Switch>
                <LocationContext.Provider value={{ location, setLocation }}>
                    <Widget />
                </LocationContext.Provider>
            </Router>
        </HelmetProvider>
    );
}

export default App;
