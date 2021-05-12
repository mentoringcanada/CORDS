import { NavLink } from "react-router-dom";
import { StyledNav, StyledBurgerButton } from "./Nav.styles";
import NavLogic from "./Nav.logic";
import Dropdown from "./Dropdown/Dropdown";

const Nav = () => {
    const { burgerMenu, toggleBurgerMenu } = NavLogic();

    return (
        <>
            <StyledBurgerButton onClick={toggleBurgerMenu}>
                &#9776;
            </StyledBurgerButton>
            <StyledNav className={burgerMenu ? "open" : ""}>
                <NavLink
                    className="normlink"
                    to="/"
                    exact
                    onClick={toggleBurgerMenu}
                >
                    Home
                </NavLink>
                <Dropdown />
            </StyledNav>
        </>
    );
};

export default Nav;
