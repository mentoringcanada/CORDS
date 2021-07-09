import React from "react";
import { Helmet } from "react-helmet-async";

const HelmetData = () => (
    <Helmet>
        <title>CORDS</title>
        <meta http-equiv="Content-Type" content="text/html; charset=ASCII" />
        <meta name="description" content="CORDS project website" />
        <meta name="keywords" content="help, cords, youth, search" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
            href="https://fonts.googleapis.com/css2?family=Roboto&family=Source+Sans+Pro&display=swap"
            rel="stylesheet"
        />
    </Helmet>
);

export default HelmetData;
