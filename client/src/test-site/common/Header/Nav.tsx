// Imports
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import DropdownBox from "./DropdownBox";

// Styles
const StyledNav = styled.nav`
    display: flex;
    justify-content: space-around;
    font-size: 1.1rem;
    * {
        margin-right: 0.5rem;
    }
    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: 0.4rem 1rem;
    }
    a.normlink {
        max-height: 100px;
        color: #eee;
        margin: 0.2rem 0.5rem 0.2rem 0rem;
        :hover {
            color: #fff;
            box-shadow: inset 0 -5px 1px -2px white;
        }
    }
`;

const StyledDropdown = styled.div`
    position: relative;
    button {
        display: flex;
        align-items: center;
        height: 90px;
        font-size: 1.1rem;
        font-weight: normal;
        padding: 0.5rem 1rem;
        color: #eee;
        background-color: transparent;
        span {
            display: flex;
            align-items: center;
            margin-left: 0.4rem;
            font-size: 1rem;
        }
        :hover {
            color: #fff;
        }
    }
    div {
        display: flex;
        position: absolute;
        top: 100%;
        background-color: #f9f9f9;
        margin-right: 0.5rem;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        flex-direction: column;
        a {
            color: #444;
            border-radius: 0;
            width: 100%;
            :hover {
                background-color: #ddd;
                color: #444;
                border: none;
            }
        }
        a.active {
            background-color: #ddd;
        }
    }
`;

const Nav = () => {
    const [showDemos, setShowDemos] = useState(false);

    // For clicking out of dropdown
    const dropdownRef = React.createRef<HTMLDivElement>();

    const handleClickOutside = (e: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDemos(false);
        }
    };

    return (
        <StyledNav>
            <NavLink className="normlink" to="/" exact activeClassName="active">
                Home
            </NavLink>
            <StyledDropdown ref={dropdownRef}>
                <button onClick={() => setShowDemos(!showDemos)}>
                    Demos{" "}
                    <span>
                        <FaAngleDown />
                    </span>
                </button>
                {showDemos && (
                    <DropdownBox handleClickOutside={handleClickOutside}>
                        <NavLink to="/demo/food" exact activeClassName="active">
                            Food
                        </NavLink>
                        <NavLink
                            to="/demo/shelter"
                            exact
                            activeClassName="active"
                        >
                            Shelter
                        </NavLink>
                        <NavLink
                            to="/demo/clothing"
                            exact
                            activeClassName="active"
                        >
                            Clothing
                        </NavLink>
                        <NavLink
                            to="/demo/custom"
                            exact
                            activeClassName="demoactive"
                        >
                            Custom
                        </NavLink>
                    </DropdownBox>
                )}
            </StyledDropdown>
        </StyledNav>
    );
};

export default Nav;
