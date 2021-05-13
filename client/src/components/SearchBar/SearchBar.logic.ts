import React from "react";
import { useContext, useState } from "react";
import { getGeoSearchResults } from "../../helper/api";
import LocationContext from "../../helper/LocationContext/LocationContext";
import { GeoSearchBody, Service } from "../../types";

const SearchBarLogic = (
    setSearchResults: React.Dispatch<React.SetStateAction<Service[]>>
) => {
    const [search, setSearch] = useState("");
    const { location } = useContext(LocationContext);

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
