import { NavLink } from "react-router-dom";
import { StyledNav, StyledBurgerButton } from "./Nav.styles";
import NavLogic from "./Nav.logic";
import Dropdown from "./Dropdown/Dropdown";

const Nav = () => {
    const { burgerMenu, toggleBurgerMenu, error, data, demoDropName } =
        NavLogic();

    if (error) {
        return <p>Content collection error...</p>;
    }

    return (
        <>
            <StyledBurgerButton
                data-testid="burger-button"
                onClick={toggleBurgerMenu}
            >
                &#9776;
            </StyledBurgerButton>
            <StyledNav className={burgerMenu ? "open" : ""}>
                {data &&
                    data.navLinks.map((navLink: any, index: number) => {
                        if (index >= 1) {
                            return (
                                <NavLink
                                    className="normlink"
                                    to={`/${
                                        navLink.route ? navLink.route : ""
                                    }`}
                                    onClick={toggleBurgerMenu}
                                    key={index}
                                >
                                    {navLink.name}
                                </NavLink>
                            );
                        } else {
                            return null;
                        }
                    })}
                <Dropdown name={demoDropName} links={data && data.demoPages} />
            </StyledNav>
        </>
    );
};

export default Nav;
