import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { GET_NAV_CONTENT } from "../../../helper/CMS";
import LanguageContext from "../../../helper/LanguageContext";

const NavLogic = () => {
    // Mobile
    const [burgerMenu, setBurgerMenu] = useState(false);

    const toggleBurgerMenu = () => {
        setBurgerMenu(!burgerMenu);
    };

    // Text content
    const { language } = useContext(LanguageContext);
    const { error, data } = useQuery(GET_NAV_CONTENT, {
        variables: { language },
    });
    const demoDropName = language === "en" ? "Demos" : "Démos";

    return {
        burgerMenu,
        toggleBurgerMenu,
        error,
        data,
        demoDropName,
    };
};

export default NavLogic;
