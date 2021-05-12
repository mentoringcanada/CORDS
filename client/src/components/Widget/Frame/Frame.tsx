// Imports
import React from "react";
import Search from "../pages/search/Search";
import SearchBar from "../../SearchBar/SearchBar";
import { StyledCloseButton, StyledFrame } from "./Frame.styles";
import FrameLogic from "./Frame.logic";

// Props
interface Props {
    setWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

// Body of Widget holding components
const Frame = ({ setWidget }: Props) => {
    const { searchResults, setSearchResults, setPage } = FrameLogic();

    return (
        <StyledFrame>
            <StyledCloseButton onClick={() => setWidget(false)}>
                &minus;
            </StyledCloseButton>
            <SearchBar setSearchResults={setSearchResults} setPage={setPage} />
            <Search searchResults={searchResults} />
        </StyledFrame>
    );
};

export default Frame;
