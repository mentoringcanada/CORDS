import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { GET_SEARCH_BAR } from "../../../helper/CMS";
import LanguageContext from "../../../helper/LanguageContext";
import SearchContext from "../SearchContext";

const SearchBarLogic = () => {
    const { search, setSearch } = useContext(SearchContext);

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
        handleSearchChange,
        error,
        searchBarPlaceholder,
    };
};

export default SearchBarLogic;
