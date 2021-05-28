import LocationBar from "./LocationBar/LocationBar";
import SearchBar from "./SearchBar/SearchBar";
import SearchInputLogic from "./SearchInput.logic";
import SearchInputContext from "./SearchInputContext";
import { GeoSearchBody } from "../../types";

interface Props {
    handleGeoSearch: (geoSearchBody: GeoSearchBody) => void;
}

const SearchInput = ({ handleGeoSearch }: Props) => {
    const {
        geoSearchBody,
        setGeoSearchBody,
        useHandleLocalLocation,
        error,
        searchInputContent,
    } = SearchInputLogic();
    useHandleLocalLocation();

    if (error) {
        return <p>Content collection error...</p>;
    }

    return (
        <SearchInputContext.Provider
            value={{ geoSearchBody, setGeoSearchBody }}
        >
            <SearchBar
                handleGeoSearch={handleGeoSearch}
                searchBarPlaceholder={searchInputContent.searchBarPlaceholder}
            />
            <LocationBar
                locationPlaceholder={searchInputContent.locationPlaceholder}
                distancePlaceholder={searchInputContent.distancePlaceholder}
            />
        </SearchInputContext.Provider>
    );
};

export default SearchInput;
