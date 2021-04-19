// Import
import React, { useEffect, useState } from "react";
import "./App.css";
import TestSite from "./test-site/TestSite";
import UserContext from "./widget/user/UserContext";
import Widget from "./widget/Widget";

// Utils
import { linkOut } from "./widget/utils/api";

// Component
function App() {
    // Setting default user
    const [user, setUser] = useState<User>({
        location: {
            lat: undefined,
            lng: undefined,
        },
    });

    useEffect(() => {
        // Calls link out on page close
        window.onbeforeunload = linkOut;
    }, []);

    return (
        <div>
            <TestSite />
            <UserContext.Provider value={{ user, setUser }}>
                <Widget />
            </UserContext.Provider>
        </div>
    );
}

export default App;
