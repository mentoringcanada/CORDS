// Imports
import React from "react";
import styled from "styled-components";

// Styling
const StyledNavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    margin: 0.5rem;
    button {
        background-color: transparent;
        font-size: 1rem;
    }
`;

// Props
interface Props {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar = ({ setPage }: Props) => {
    return (
        <StyledNavBar>
            <button onClick={() => setPage("landing")}>Landing</button>
            <button onClick={() => setPage("search")}>Search</button>
            <button onClick={() => setPage("selections")}>Selections</button>
        </StyledNavBar>
    );
};

export default NavBar;
