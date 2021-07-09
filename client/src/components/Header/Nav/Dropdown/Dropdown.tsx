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

interface Props {
    name: string;
    links: any[];
}

const Dropdown = ({ name, links }: Props) => {
    const dropdownRef = useRef(null);
    const { toggleBurgerMenu } = NavLogic();
    const { showDropdownMenu, toggleDropdownMenu, useClickAlert } =
        DropdownLogic();
    useClickAlert(dropdownRef);

    return (
        <StyledDropdown ref={dropdownRef}>
            <StyledDropdownButton onClick={toggleDropdownMenu}>
                {name}
                <FaAngleDown />
            </StyledDropdownButton>
            {showDropdownMenu && (
                <StyledDropdownMenu>
                    {links &&
                        links.map((link, index) => {
                            return (
                                <NavLink
                                    to={`/demo/${link.route}`}
                                    exact
                                    activeClassName="active"
                                    onClick={toggleBurgerMenu}
                                    key={index}
                                >
                                    {link.shortName}
                                </NavLink>
                            );
                        })}
                </StyledDropdownMenu>
            )}
        </StyledDropdown>
    );
};

export default Dropdown;
