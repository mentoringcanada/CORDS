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
    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: 0.4rem 1rem;
        &.normlink {
            max-height: 100px;
            color: #eee;
            margin: 0.2rem 0.5rem 0.2rem 0rem;
            :hover {
                color: #fff;
                box-shadow: inset 0 -5px 1px -2px white;
            }
        }
    }
    @media only screen and (max-width: 768px) {
        display: none;
        position: absolute;
        top: 100%;
        height: 70px;
        width: 100%;
        background-color: #22262add;
        a {
            width: 50%;
            justify-content: center;
            &.normlink {
                margin: 0;
                :hover {
                    box-shadow: none;
                }
            }
        }
        &.open {
            display: flex;
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
            justify-content: center;
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
    @media only screen and (max-width: 768px) {
        width: 50%;
        margin: 0;
        button {
            width: 100%;
            height: 70px;
            justify-content: center;
            margin: 0;
            span {
                margin: none;
            }
        }
        div {
            width: 100%;
        }
    }
`;

const StyledBurgerButton = styled.div`
    display: none;
    align-items: center;
    font-size: 1.5rem;
    margin-right: 1rem;
    @media only screen and (max-width: 768px) {
        display: flex;
    }
`;

const Nav = () => {
    const [showDemos, setShowDemos] = useState(false);

    // For clicking out of dropdown
    const dropdownRef = React.createRef<HTMLDivElement>();

    // Mobile
    const [isOpen, setIsOpen] = useState(false);

    const handleClickOutside = (e: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDemos(false);
        }
    };

    return (
        <>
            <StyledBurgerButton onClick={() => setIsOpen(!isOpen)}>
                &#9776;
            </StyledBurgerButton>
            <StyledNav className={isOpen ? "open" : ""}>
                <NavLink
                    className="normlink"
                    to="/"
                    exact
                    onClick={() => setIsOpen(false)}
                >
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
                            <NavLink
                                to="/demo/food"
                                exact
                                activeClassName="active"
                                onClick={() => setIsOpen(false)}
                            >
                                Food
                            </NavLink>
                            <NavLink
                                to="/demo/shelter"
                                exact
                                activeClassName="active"
                                onClick={() => setIsOpen(false)}
                            >
                                Shelter
                            </NavLink>
                            <NavLink
                                to="/demo/clothing"
                                exact
                                activeClassName="active"
                                onClick={() => setIsOpen(false)}
                            >
                                Clothing
                            </NavLink>
                            <NavLink
                                to="/demo/custom"
                                exact
                                activeClassName="demoactive"
                                onClick={() => setIsOpen(false)}
                            >
                                Custom
                            </NavLink>
                        </DropdownBox>
                    )}
                </StyledDropdown>
            </StyledNav>
        </>
    );
};

export default Nav;
