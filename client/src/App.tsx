import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import GlobalStyle from "./App.styles";
import Header from "./components/Header/Header";
import Widget from "./components/Widget/Widget";
import Start from "./pages/Start/Start";
import Demo from "./pages/Demos/Demo";
import CustomDemo from "./pages/Demos/CustomDemo/CustomDemo";
import Home from "./pages/Home/Home";
import AppLogic from "./App.logic";
import Search from "./pages/Search/Search";

function App() {
    const { useStartupEffect } = AppLogic();
    useStartupEffect();

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
                            title="Food Bank"
                            description="Dedicated to helping Canadians living with food insecurity on an on-going, seasonal, and emergency basis."
                        />
                    </Route>
                    <Route path="/demo/shelter">
                        <Demo
                            title="Homeless Shelter"
                            description="We provide temporary residence for homeless individuals and families."
                        />
                    </Route>
                    <Route path="/demo/clothing">
                        <Demo
                            title="Clothing Bank"
                            description="Drop-off site for donations of used/unwanted clothing."
                        />
                    </Route>
                    <Route path="/demo/custom">
                        <CustomDemo />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                </Switch>
                <Widget />
            </Router>
        </HelmetProvider>
    );
}

export default App;
