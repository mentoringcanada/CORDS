// Import
import React, { useEffect } from "react";
import "./App.css";

// Components
import TestSite from "./test-site/TestSite";
import StartScreen from "./start-screen/StartScreen";
import { Helmet } from "react-helmet";

// Utils
import { linkOut } from "./widget/utils/api";

// Component
function App() {
    useEffect(() => {
        // Calls link out on page close
        window.onbeforeunload = linkOut;
    }, []);

    return (
        <div>
            <Helmet>
                <title>CORDS</title>
                <meta name="description" content="CORDS project website" />
                <meta name="keywords" content="help, cords, youth, search" />
            </Helmet>
            <StartScreen />
            <TestSite />
        </div>
    );
}

export default App;
