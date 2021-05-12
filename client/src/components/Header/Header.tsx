import Nav from "./Nav/Nav";
import { StyledHeader } from "./Header.styles";

const Header = () => {
    return (
        <StyledHeader>
            <h2>CORDS Test Site</h2>
            <Nav />
        </StyledHeader>
    );
};

export default Header;
