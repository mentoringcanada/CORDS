import { FormEvent, useContext } from "react";
import SearchInputContext from "../SearchInputContext";

const SearchBarLogic = (handleGeoSearch: any) => {
    const { geoSearchBody, setGeoSearchBody } = useContext(SearchInputContext);

    const handleSearchForm = (e: FormEvent) => {
        e.preventDefault();
        handleGeoSearch(geoSearchBody);
    };

    const handleSearchChange = (e: any) => {
        setGeoSearchBody({
            ...geoSearchBody,
            search: e.target.value,
        });
    };

    return { handleSearchForm, handleSearchChange };
};

export default SearchBarLogic;
