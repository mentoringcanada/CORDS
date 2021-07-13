import { FaSearch } from "react-icons/fa";
import { StyledSearchBar } from "./SearchBar.styles";
import SearchBarLogic from "./SearchBar.logic";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
    const {
        handleSearchChange,
        searchBarPlaceholder,
        error,
        search,
        language,
    } = SearchBarLogic();
    const history = useHistory();

    if (error) return <p>Content collection error...</p>;

    return (
        <StyledSearchBar
            onSubmit={(e) => {
                e.preventDefault();
                history.push(
                    `/search/results?query=${search.query}&distance=${search.distance}&lat=${search.location.lat}&lng=${search.location.lng}&filter=${search.filter}&ln=${language}&page=1`
                );
            }}
        >
            <input
                type="text"
                value={search.query}
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
