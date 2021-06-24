import { useState } from "react";
import { getGeoSearchResults } from "../../helper/API";
import { GeoSearchBody, Search } from "../../types";

const SearchLogic = () => {
    const [search, setSearch] = useState<Search>({
        query: "",
        distance: 50,
        filter: "best",
        state: "",
        services: [],
        location: {
            lat: undefined,
            lng: undefined,
        },
    });

    const handleGeoSearch = (page: number) => {
        const geoSearch: GeoSearchBody = {
            distance: search.distance,
            lat: search.location.lat,
            lng: search.location.lng,
            query: search.query,
            page,
        };

        if (page === 1) {
            setSearch({ ...search, state: "searching", services: [] });
        } else {
            setSearch({ ...search, state: "searching" });
        }
        getGeoSearchResults(geoSearch).then((res) => {
            if (Array.isArray(res) && !res.length) {
                setSearch({ ...search, state: "no-results" });
            } else {
                setSearch({
                    ...search,
                    state: "",
                    services: res,
                });
            }
        });
    };

    return {
        search,
        setSearch,
        handleGeoSearch,
    };
};

export default SearchLogic;
