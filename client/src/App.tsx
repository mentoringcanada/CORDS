import React, { useState } from "react";
import "./App.css";
import TestSite from "./test-site/TestSite";
import UserContext from "./widget/user/UserContext";
import Widget from "./widget/Widget";

function App() {
    // Setting default user
    const [user, setUser] = useState<User>({
        location: {
            lat: undefined,
            lng: undefined,
        },
    });

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
