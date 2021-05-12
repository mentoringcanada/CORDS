import React from "react";
import { useContext, useState } from "react";
import { getSearchResults } from "../../helper/api";
import UserContext from "../../helper/user/UserContext";
import { Service } from "../../types";

const SearchBarLogic = (
    setSearchResults: React.Dispatch<React.SetStateAction<Service[]>>
) => {
    const [search, setSearch] = useState("");
    const { user } = useContext(UserContext);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const searchBody = {
            search,
            lat: user.location.lat,
            lng: user.location.lng,
        };
        getSearchResults(searchBody).then((res) => setSearchResults(res));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value);

    return { handleSearch, handleSearchChange };
};

export default SearchBarLogic;
