import { useState } from "react";

const NavLogic = () => {
    // Mobile
    const [burgerMenu, setBurgerMenu] = useState(false);

    const toggleBurgerMenu = () => {
        setBurgerMenu(!burgerMenu);
    };

    return {
        burgerMenu,
        toggleBurgerMenu,
    };
};

export default NavLogic;
