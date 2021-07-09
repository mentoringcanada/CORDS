import { FaSearch } from "react-icons/fa";
import { StyledSearchBar } from "./SearchBar.styles";
import SearchBarLogic from "./SearchBar.logic";

interface Props {
    handleGeoSearch: (page: number) => void;
}

const SearchBar = ({ handleGeoSearch }: Props) => {
    const { handleSearchChange, searchBarPlaceholder, error } =
        SearchBarLogic();

    if (error) return <p>Content collection error...</p>;

    return (
        <StyledSearchBar
            onSubmit={(e) => {
                e.preventDefault();
                handleGeoSearch(1);
            }}
        >
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
