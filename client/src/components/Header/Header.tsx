import Nav from "./Nav/Nav";
import { StyledHeader } from "./Header.styles";
import Title from "../../media/Title.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <StyledHeader data-testid="header">
            <Link to="/" className="logo-link">
                <img src={Title} alt="CORDS Title Logo" />
            </Link>
            <Nav />
        </StyledHeader>
    );
};

export default Header;
