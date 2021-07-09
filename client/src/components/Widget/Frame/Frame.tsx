import React from "react";
import { StyledFrame } from "./Frame.styles";
import Header from "../Header/Header";
import SearchPage from "../pages/Search/SearchPage";

interface Props {
    setWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

// Body of Widget holding components
const Frame = ({ setWidget }: Props) => {
    return (
        <StyledFrame>
            <Header setWidget={setWidget} />
            <SearchPage />
        </StyledFrame>
    );
};

export default Frame;
