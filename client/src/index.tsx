import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_IP}`;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
