import { useQuery } from "@apollo/client";
import { FormEvent, useContext } from "react";
import { GET_SEARCH_BAR } from "../../../helper/CMS";
import LanguageContext from "../../../helper/LanguageContext";
import { GeoSearchBody } from "../../../types";
import SearchContext from "../SearchContext";

const SearchBarLogic = (handleGeoSearch: any) => {
    const { search, setSearch } = useContext(SearchContext);

    const handleSearchForm = (e: FormEvent) => {
        e.preventDefault();

        const geoSearchBody: GeoSearchBody = {
            distance: search.distance,
            lat: search.location.lat,
            lng: search.location.lng,
            query: search.query,
        };

        handleGeoSearch(geoSearchBody);
    };

    const handleSearchChange = (e: any) => {
        setSearch({
            ...search,
            query: e.target.value,
        });
    };

    // Text content
    const { language } = useContext(LanguageContext);
    const { error, data } = useQuery(GET_SEARCH_BAR, {
        variables: { language },
    });
    const searchBarPlaceholder = data
        ? data.searches[0].searchBarPlaceholder
        : [];

    return {
        handleSearchForm,
        handleSearchChange,
        error,
        searchBarPlaceholder,
    };
};

export default SearchBarLogic;
