import { useState } from "react";
import { getGeoSearchResults } from "../../../../helper/API";
import { GeoSearchBody, Service } from "../../../../types";

const WidgetSearchLogic = () => {
    const [searchResults, setSearchResults] = useState<Service[]>([]);
    const [searchState, setSearchState] = useState("");

    const handleGeoSearch = (geoSearchBody: GeoSearchBody) => {
        setSearchResults([]);
        setSearchState("searching");
        getGeoSearchResults(geoSearchBody).then((res) => {
            if (Array.isArray(res) && !res.length) {
                setSearchState("no-results");
            } else {
                setSearchState("");
                setSearchResults(res);
            }
        });
    };

    return {
        searchResults,
        setSearchResults,
        searchState,
        setSearchState,
        handleGeoSearch,
    };
};

export default WidgetSearchLogic;
