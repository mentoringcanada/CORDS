import { FaSearch } from "react-icons/fa";
import { StyledSearchBar } from "./SearchBar.styles";
import { GeoSearchBody } from "../../../../types";
import SearchBarLogic from "./SearchBar.logic";

interface Props {
    handleGeoSearch: (geoSearchBody: GeoSearchBody) => void;
    searchBarPlaceholder: string;
}

const SearchBar = ({ handleGeoSearch, searchBarPlaceholder }: Props) => {
    const { handleSearchForm, handleSearchChange } =
        SearchBarLogic(handleGeoSearch);

    return (
        <StyledSearchBar onSubmit={handleSearchForm}>
            <input
                type="text"
                placeholder={searchBarPlaceholder}
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
