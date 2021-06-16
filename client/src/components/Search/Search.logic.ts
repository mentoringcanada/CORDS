import { useEffect, useRef, useState } from "react";
import { getGeoSearchResults } from "../../helper/API";
import { GeoSearchBody, Search } from "../../types";

const SearchLogic = () => {
    const [search, setSearch] = useState<Search>({
        query: "",
        distance: 50,
        filter: "best",
        state: "",
        services: [],
        page: 1,
        location: {
            lat: undefined,
            lng: undefined,
        },
    });

    const handleGeoSearch = () => {
        const geoSearch: GeoSearchBody = {
            distance: search.distance,
            lat: search.location.lat,
            lng: search.location.lng,
            query: search.query,
            page: search.page,
        };

        setSearch({ ...search, state: "searching" });
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

    const useOnPageChange = (page: number) => {
        const didMount = useRef(false);

        useEffect(() => {
            if (didMount.current) handleGeoSearch();
            else didMount.current = true;
        }, [page]);
    };

    return {
        search,
        setSearch,
        handleGeoSearch,
        useOnPageChange,
    };
};

export default SearchLogic;
