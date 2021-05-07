// Imports
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Styles
const StyledHeader = styled.header`
    background-color: var(--secondary-color);
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
        font-size: 1.1rem;
        a {
            text-decoration: none;
            color: white;
            padding: 0.5rem 1rem;
        }
        a.active {
            background-color: var(--primary-color);
            border-radius: 0.4rem;
        }
    }
    .demosdropdown {
        button {
            display: flex;
            align-items: center;
            font-size: 1.1rem;
            font-weight: normal;
            padding: 0.5rem 1rem;
            background-color: transparent;
            span {
                margin-left: 0.4rem;
                font-size: 0.8rem;
            }
        }
        div {
            &.show {
                display: flex;
            }
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            margin: 1.3rem 0 0 0.5rem;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 1;
            flex-direction: column;
            a {
                color: #999;
                border-radius: 0;
            }
            a.demoactive {
                color: white;
                background-color: var(--secondary-color);
            }
        }
    }
`;

const Header = () => {
    const [showDemos, setShowDemos] = useState(false);
    return (
        <StyledHeader>
            <h2>CORDS Test Site</h2>
            <nav>
                <NavLink to="/" exact activeClassName="active">
                    Home
                </NavLink>
                <div className="demosdropdown">
                    <button onClick={() => setShowDemos(!showDemos)}>
                        Demos <span>&#x25BC;</span>
                    </button>
                    <div className={showDemos ? "show" : ""}>
                        <NavLink to="/demo1" exact activeClassName="demoactive">
                            Food
                        </NavLink>
                        <NavLink to="/demo2" exact activeClassName="demoactive">
                            Shelter
                        </NavLink>
                        <NavLink to="/demo3" exact activeClassName="demoactive">
                            Clothing
                        </NavLink>
                        <NavLink
                            to="/custom"
                            exact
                            activeClassName="demoactive"
                        >
                            Custom
                        </NavLink>
                    </div>
                </div>
            </nav>
        </StyledHeader>
    );
};

export default Header;
