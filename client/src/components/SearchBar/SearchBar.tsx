import React from "react";
import { FaSearch } from "react-icons/fa";
import { StyledSearchBar } from "./SearchBar.styles";
import { Service } from "../../types";
import SearchBarLogic from "./SearchBar.logic";

interface Props {
    setSearchResults: React.Dispatch<React.SetStateAction<Service[]>>;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ setSearchResults, setPage }: Props) => {
    const { handleSearch, handleSearchChange } =
        SearchBarLogic(setSearchResults);
    return (
        <StyledSearchBar onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="How can we help?"
                onChange={handleSearchChange}
            />
            <button type="submit">
                <FaSearch />
            </button>
        </StyledSearchBar>
    );
};

export default SearchBar;
