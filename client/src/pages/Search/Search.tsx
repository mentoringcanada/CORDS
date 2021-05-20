import { StyledContainer } from "../../styles/StyledContainer";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import SearchLogic from "./Search.logic";
import { StyledSearch } from "./Search.styles";
import SearchInput from "./SearchInput/SearchInput";
import SearchOutput from "./SearchOutput/SearchOutput";

const Search = () => {
    const { searchResults, searchState, setSearchState, handleGeoSearch } =
        SearchLogic();

    return (
        <StyledPageContainer>
            <StyledSearch>
                <StyledContainer>
                    <SearchInput handleGeoSearch={handleGeoSearch} />
                </StyledContainer>
                <StyledContainer className="search-output">
                    <SearchOutput
                        searchResults={searchResults}
                        searchState={searchState}
                        setSearchState={setSearchState}
                    />
                </StyledContainer>
            </StyledSearch>
        </StyledPageContainer>
    );
};

export default Search;
