import Nav from "./Nav/Nav";
import { StyledHeader } from "./Header.styles";
import Title from "../../media/Title.png";

const Header = () => {
    return (
        <StyledHeader>
            <img src={Title} alt="Title Logo" />
            <Nav />
        </StyledHeader>
    );
};

export default Header;
