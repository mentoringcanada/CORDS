import { NavLink } from "react-router-dom";
import { StyledNav, StyledBurgerButton } from "./Nav.styles";
import NavLogic from "./Nav.logic";
import Dropdown from "./Dropdown/Dropdown";

const Nav = () => {
    const {
        burgerMenu,
        toggleBurgerMenu,
        error,
        data,
        demoDropName,
        language,
    } = NavLogic();

    if (error) {
        return <p>Content collection error...</p>;
    }

    return (
        <>
            <StyledBurgerButton
                data-testid="burger-button"
                onClick={toggleBurgerMenu}
            >
                <span className={burgerMenu ? "open" : ""}>&#9776;</span>
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
                                    }?ln=${language}`}
                                    onClick={() => toggleBurgerMenu()}
                                    key={index}
                                >
                                    {navLink.name}
                                </NavLink>
                            );
                        } else {
                            return null;
                        }
                    })}
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
