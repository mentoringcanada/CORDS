import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    /* Defualt Styling */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* Colors */
    html {
        --primary-color: #2d9cdb;
        --secondary-color: #c22418;
        --main-font: "Roboto";
        --secondary-font: "Source Sans Pro";
        color: #222222;
    }

    body,
    button {
        font-family: var(--main-font), var(--secondary-font), Arial, Helvetica,
            sans-serif;
    }
    p {
        font-family: var(--main-font), Arial, Helvetica, sans-serif;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: var(--secondary-font), Arial, Helvetica, sans-serif;
    }
    strong {
        color: #222222;
    }

    /* Buttons */
    button {
        border: none;
        cursor: pointer;
        color: white;
        font-size: large;
        font-weight: bold;
    }
    button:focus {
        outline: none;
    }

    /* Input */
    input {
        border: none;
    }
    input:focus {
        outline: none;
    }

    /* Scroll bar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 0px 3px 3px 0px;
    }
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

export default GlobalStyles;
