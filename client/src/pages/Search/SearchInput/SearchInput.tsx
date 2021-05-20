import LocationBar from "./LocationBar/LocationBar";
import SearchBar from "./SearchBar/SearchBar";
import SearchInputLogic from "./SearchInput.logic";
import SearchInputContext from "./SearchInputContext";
import { GeoSearchBody } from "../../../types";

interface Props {
    handleGeoSearch: (geoSearchBody: GeoSearchBody) => void;
}

const SearchInput = ({ handleGeoSearch }: Props) => {
    const { geoSearchBody, setGeoSearchBody, useHandleLocalLocation } =
        SearchInputLogic();
    useHandleLocalLocation();

    return (
        <SearchInputContext.Provider
            value={{ geoSearchBody, setGeoSearchBody }}
        >
            <SearchBar handleGeoSearch={handleGeoSearch} />
            <LocationBar />
        </SearchInputContext.Provider>
    );
};

export default SearchInput;
