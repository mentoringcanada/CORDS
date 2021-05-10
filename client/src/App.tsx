// Import
import React, { useEffect } from "react";
import "./App.css";

// Components
import TestSite from "./test-site/TestSite";
import StartScreen from "./test-site/start-screen/StartScreen";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Utils
import { linkOut } from "./widget/utils/api";

// Component
function App() {
    useEffect(() => {
        // Calls link out on page close
        window.onbeforeunload = linkOut;
    }, []);

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>CORDS</title>
                    <meta name="description" content="CORDS project website" />
                    <meta
                        name="keywords"
                        content="help, cords, youth, search"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, minimum-scale=1"
                    />
                </Helmet>
                <StartScreen />
                <TestSite />
            </div>
        </HelmetProvider>
    );
}

export default App;
