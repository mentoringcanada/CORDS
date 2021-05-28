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
                <SearchInput handleGeoSearch={handleGeoSearch} />
                <div className="break" />
                <ServiceOutput
                    serviceResults={searchResults}
                    searchState={searchState}
                    setSearchState={setSearchState}
                />
            </StyledSearch>
        </StyledPageContainer>
    );
};

export default Search;
