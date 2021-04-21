// Imports
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styles
const StyledHeader = styled.header`
    background-color: #c22418;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 5rem;
    h2 {
        font-size: 1.7rem;
    }
    nav {
        display: flex;
        justify-content: space-around;
        width: 30rem;
        font-size: 1.1rem;
        a {
            text-decoration: none;
            color: white;
        }
    }
`;

const Header = () => {
    return (
        <StyledHeader>
            <h2>CORDS Test Site</h2>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/demo1">Demo 1</Link>
                <Link to="/demo2">Demo 2</Link>
                <Link to="/demo3">Demo 3</Link>
                <Link to="/custom">Custom Demo</Link>
            </nav>
        </StyledHeader>
    );
};

export default Header;
