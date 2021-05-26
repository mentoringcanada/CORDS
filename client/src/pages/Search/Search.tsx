import { StyledContainer } from "../../styles/StyledContainer";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import SearchLogic from "./Search.logic";
import { StyledSearch } from "./Search.styles";
import SearchInput from "../../components/SearchInput/SearchInput";
import ServiceOutput from "../../components/Services/ServicesOutput/ServicesOutput";

const Search = () => {
    const { searchResults, searchState, setSearchState, handleGeoSearch } =
        SearchLogic();

    return (
        <StyledPageContainer>
            <StyledSearch>
                <StyledContainer className="search-container">
                    <SearchInput handleGeoSearch={handleGeoSearch} />
                    <ServiceOutput
                        serviceResults={searchResults}
                        searchState={searchState}
                        setSearchState={setSearchState}
                    />
                </StyledContainer>
            </StyledSearch>
        </StyledPageContainer>
    );
};

export default Search;
