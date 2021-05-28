import { useState } from "react";
import { getGeoSearchResults } from "../../../../helper/API";
import { GeoSearchBody, SearchResults } from "../../../../types";

const WidgetSearchLogic = () => {
    const [searchState, setSearchState] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResults>({
        services: [],
        location: {
            lat: undefined,
            lng: undefined,
        },
    });

    const handleGeoSearch = (geoSearchBody: GeoSearchBody) => {
        setSearchResults({
            services: [],
            location: {
                lat: undefined,
                lng: undefined,
            },
        });
        setSearchState("searching");
        getGeoSearchResults(geoSearchBody).then((res) => {
            if (Array.isArray(res) && !res.length) {
                setSearchState("no-results");
            } else {
                setSearchState("");
                setSearchResults({
                    services: res,
                    location: geoSearchBody.location,
                });
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
