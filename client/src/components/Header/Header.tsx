import Nav from "./Nav/Nav";
import { StyledHeader } from "./Header.styles";
import Title from "../../media/Title.png";
import { Link } from "react-router-dom";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { useContext } from "react";
import LanguageContext from "../../helper/LanguageContext";

const Header = () => {
    const { language } = useContext(LanguageContext);

    return (
        <StyledHeader data-testid="header">
            <Link to={`/?ln=${language}`} className="logo-link">
                <img src={Title} alt="CORDS Title Logo" />
            </Link>
            <div className="right">
                <LanguageToggle />
                <div className="break" />
                <Nav />
            </div>
        </StyledHeader>
    );
};

export default Header;
