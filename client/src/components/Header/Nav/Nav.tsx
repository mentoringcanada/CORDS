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
                    data.navLinks.map((navLink: any, index: number) => (
                        <NavLink
                            className="normlink"
                            to={`/${navLink.route ? navLink.route : ""}`}
                            exact
                            onClick={toggleBurgerMenu}
                            key={index}
                        >
                            {navLink.name}
                        </NavLink>
                    ))}
                <Dropdown
                    name={demoDropName}
                    links={data && data.demoPages}
                    toggleBurgerMenu={toggleBurgerMenu}
                />
            </StyledNav>
        </>
    );
};

export default Nav;
