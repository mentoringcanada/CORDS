import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import GlobalStyle from "./App.styles";
import Header from "./components/Header/Header";
import Widget from "./components/Widget/Widget";
import Start from "./pages/Start/Start";
import Demo from "./pages/Demos/Demo";
import CustomDemo from "./pages/Demos/CustomDemo/CustomDemo";
import Home from "./pages/Home/Home";
import AppLogic from "./App.logic";
import Search from "./pages/Search/SearchPage";
import { Demos } from "./types";
import LanguageContext from "./helper/LanguageContext";
import Helmet from "./helper/Helmet";

function App() {
    const { language, setLanguage, error, demoPages } = AppLogic();

    if (error) return <p>Content collection error...</p>;

    return (
        <HelmetProvider>
            <Helmet />
            <GlobalStyle />
            <Start />
            <Router>
                <LanguageContext.Provider value={{ language, setLanguage }}>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        {demoPages.map(
                            (
                                { route, name, description }: Demos,
                                index: number
                            ) =>
                                route === "custom" ? (
                                    <Route path="/demo/custom" key={index}>
                                        <CustomDemo />
                                    </Route>
                                ) : (
                                    <Route path={`/demo/${route}`} key={index}>
                                        <Demo
                                            title={name}
                                            description={description}
                                        />
                                    </Route>
                                )
                        )}
                        <Route path="/search">
                            <Search />
                        </Route>
                    </Switch>
                    <Widget />
                </LanguageContext.Provider>
            </Router>
        </HelmetProvider>
    );
}

export default App;
