// Import
import React, { useEffect } from "react";
import "./App.css";

// Components
import TestSite from "./test-site/TestSite";
import StartScreen from "./start-screen/StartScreen";

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
            <StartScreen />
            <TestSite />
        </div>
    );
}

export default App;
