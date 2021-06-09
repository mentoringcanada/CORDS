import React from "react";
import Search from "../../components/Search/Search";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import { StyledSearch } from "./SearchPage.styles";

const SearchPage = () => {
    return (
        <StyledPageContainer>
            <StyledSearch>
                <Search />
            </StyledSearch>
        </StyledPageContainer>
    );
};

export default SearchPage;
