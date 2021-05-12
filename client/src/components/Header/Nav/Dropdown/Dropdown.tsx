import {
    StyledDropdown,
    StyledDropdownMenu,
    StyledDropdownButton,
} from "./Dropdown.styles";
import DropdownLogic from "./Dropdown.logic";
import { FaAngleDown } from "react-icons/fa";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import NavLogic from "../Nav.logic";

const Dropdown = () => {
    const dropdownRef = useRef(null);
    const { toggleBurgerMenu } = NavLogic();
    const { showDropdownMenu, toggleDropdownMenu, useClickAlert } =
        DropdownLogic();
    useClickAlert(dropdownRef);

    return (
        <StyledDropdown ref={dropdownRef}>
            <StyledDropdownButton onClick={toggleDropdownMenu}>
                Demos
                <FaAngleDown />
            </StyledDropdownButton>
            {showDropdownMenu && (
                <StyledDropdownMenu>
                    <NavLink
                        to="/demo/food"
                        exact
                        activeClassName="active"
                        onClick={toggleBurgerMenu}
                    >
                        Food
                    </NavLink>
                    <NavLink
                        to="/demo/shelter"
                        exact
                        activeClassName="active"
                        onClick={toggleBurgerMenu}
                    >
                        Shelter
                    </NavLink>
                    <NavLink
                        to="/demo/clothing"
                        exact
                        activeClassName="active"
                        onClick={toggleBurgerMenu}
                    >
                        Clothing
                    </NavLink>
                    <NavLink
                        to="/demo/custom"
                        exact
                        activeClassName="demoactive"
                        onClick={toggleBurgerMenu}
                    >
                        Custom
                    </NavLink>
                </StyledDropdownMenu>
            )}
        </StyledDropdown>
    );
};

export default Dropdown;
