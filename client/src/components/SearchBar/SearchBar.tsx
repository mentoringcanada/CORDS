import React from "react";
import { FaSearch } from "react-icons/fa";
import { StyledSearchBar } from "./SearchBar.styles";
import { Service } from "../../types";
import SearchBarLogic from "./SearchBar.logic";
import { Location } from "../../types";

interface Props {
    setSearchResults: React.Dispatch<React.SetStateAction<Service[]>>;
    location: Location;
}

const SearchBar = ({ setSearchResults, location }: Props) => {
    const { handleGeoSearch, handleSearchChange } = SearchBarLogic(
        setSearchResults,
        location
    );
    return (
        <StyledSearchBar onSubmit={handleGeoSearch}>
            <input
                type="text"
                placeholder="How can we help?"
                onChange={handleSearchChange}
                data-testid="search-input"
            />
            <button type="submit" data-testid="search-button">
                <FaSearch />
            </button>
        </StyledSearchBar>
    );
};

export default SearchBar;
