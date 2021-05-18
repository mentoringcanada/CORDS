import React from "react";
import LocationBar from "../../components/LocationBar/LocationBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import ServiceOutput from "../../components/Services/ServicesOutput/ServicesOutput";
import { StyledContainer } from "../../styles/StyledContainer";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import SearchLogic from "./Search.logic";
import { StyledSearch } from "./Search.styles";

const Search = () => {
    const {
        location,
        setLocation,
        searchResults,
        setSearchResults,
        useHandleStartFunctions,
    } = SearchLogic();
    useHandleStartFunctions();

    return (
        <StyledPageContainer>
            <StyledSearch>
                <StyledContainer>
                    <SearchBar
                        setSearchResults={setSearchResults}
                        location={location}
                    />
                    <LocationBar
                        location={location}
                        setLocation={setLocation}
                    />
                </StyledContainer>
                {searchResults && searchResults.length !== 0 && (
                    <StyledContainer className="search-output">
                        <ServiceOutput
                            services={searchResults}
                            location={location}
                        />
                    </StyledContainer>
                )}
            </StyledSearch>
        </StyledPageContainer>
    );
};

export default Search;
