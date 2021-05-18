import React from "react";
import { useState } from "react";
import { getGeoSearchResults } from "../../helper/API";
import { GeoSearchBody, Service, Location } from "../../types";

const SearchBarLogic = (
    setSearchResults: React.Dispatch<React.SetStateAction<Service[]>>,
    location: Location
) => {
    const [search, setSearch] = useState("");

    const handleGeoSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const geoSearchBody: GeoSearchBody = {
            search,
            lat: location.lat,
            lng: location.lng,
            distance: location.distance,
        };
        getGeoSearchResults(geoSearchBody).then((res) => setSearchResults(res));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value);

    return { handleGeoSearch, handleSearchChange };
};

export default SearchBarLogic;
