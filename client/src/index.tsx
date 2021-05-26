import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_IP}`;

Sentry.init({
    dsn: "https://75b64a14891b4d63832be862f50cef30@o725801.ingest.sentry.io/5782582",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
