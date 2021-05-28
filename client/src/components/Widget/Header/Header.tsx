import React from "react";
import { StyledCloseButton } from "../Frame/Frame.styles";
import { StyledHeader } from "./Header.styles";

interface Props {
    setWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setWidget }: Props) => {
    return (
        <StyledHeader>
            <h3>Search</h3>
            <StyledCloseButton
                onClick={() => setWidget(false)}
                data-testid="close-button"
            >
                &minus;
            </StyledCloseButton>
        </StyledHeader>
    );
};

export default Header;
