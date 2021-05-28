import { useRef } from "react";
import SearchInput from "../../../SearchInput/SearchInput";
import ServiceOutput from "../../../Services/ServicesOutput/ServicesOutput";
import SearchLogic from "./Search.logic";
import { StyledSearch } from "./Search.styles";

const Search = () => {
    const { searchResults, searchState, setSearchState, handleGeoSearch } =
        SearchLogic();

    const searchRef = useRef(null);

    return (
        <StyledSearch ref={searchRef}>
            <SearchInput handleGeoSearch={handleGeoSearch} />
            <div className="break" />
            <ServiceOutput
                serviceResults={searchResults}
                outputRef={searchRef}
                searchState={searchState}
                setSearchState={setSearchState}
            />
        </StyledSearch>
    );
};

export default Search;
