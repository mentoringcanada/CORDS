import { FaSearch } from "react-icons/fa";
import { StyledSearchBar } from "./SearchBar.styles";
import { GeoSearchBody } from "../../../types";
import SearchBarLogic from "./SearchBar.logic";

interface Props {
    handleGeoSearch: (geoSearch: GeoSearchBody) => void;
}

const SearchBar = ({ handleGeoSearch }: Props) => {
    const {
        handleSearchForm,
        handleSearchChange,
        searchBarPlaceholder,
        error,
    } = SearchBarLogic(handleGeoSearch);

    if (error) return <p>Content collection error...</p>;

    return (
        <StyledSearchBar onSubmit={handleSearchForm}>
            <input
                type="text"
                placeholder={searchBarPlaceholder}
                onChange={(e) => handleSearchChange(e)}
                data-testid="search-input"
            />
            <button type="submit" data-testid="search-button">
                <FaSearch />
            </button>
        </StyledSearchBar>
    );
};

export default SearchBar;
