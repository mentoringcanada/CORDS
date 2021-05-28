import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_IP}`;

Sentry.init({
    dsn: "https://75b64a14891b4d63832be862f50cef30@o725801.ingest.sentry.io/5782582",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
});

const client = new ApolloClient({
    uri: "https://portal.cordsconnect.ca/graphql",
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
