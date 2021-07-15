import {
    StyledDropdown,
    StyledDropdownMenu,
    StyledDropdownButton,
} from "./Dropdown.styles";
import DropdownLogic from "./Dropdown.logic";
import { FaAngleDown } from "react-icons/fa";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import LanguageContext from "../../../../helper/LanguageContext";

interface Props {
    name: string;
    links: any[];
    toggleBurgerMenu: () => void;
}

const Dropdown = ({ name, links, toggleBurgerMenu }: Props) => {
    const dropdownRef = useRef(null);
    const { showDropdownMenu, toggleDropdownMenu, useClickAlert } =
        DropdownLogic();
    useClickAlert(dropdownRef);
    const { language } = useContext(LanguageContext);

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
                                    to={`/demo/${link.route}?ln=${language}`}
                                    exact
                                    activeClassName="active"
                                    onClick={() => {
                                        toggleDropdownMenu();
                                        toggleBurgerMenu();
                                    }}
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
