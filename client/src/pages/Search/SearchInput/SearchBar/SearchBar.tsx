import { FaSearch } from "react-icons/fa";
import { StyledSearchBar } from "./SearchBar.styles";
import SearchInputContext from "../SearchInputContext";
import { useContext } from "react";
import { GeoSearchBody } from "../../../../types";

interface Props {
    handleGeoSearch: (geoSearchBody: GeoSearchBody) => void;
}

const SearchBar = ({ handleGeoSearch }: Props) => {
    const { geoSearchBody, setGeoSearchBody } = useContext(SearchInputContext);

    return (
        <StyledSearchBar
            onSubmit={(e) => {
                e.preventDefault();
                handleGeoSearch(geoSearchBody);
            }}
        >
            <input
                type="text"
                placeholder="How can we help?"
                onChange={(e) =>
                    setGeoSearchBody({
                        ...geoSearchBody,
                        search: e.target.value,
                    })
                }
                data-testid="search-input"
            />
            <button type="submit" data-testid="search-button">
                <FaSearch />
            </button>
        </StyledSearchBar>
    );
};

export default SearchBar;
