import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { GET_SEARCH_STATE } from "../../../helper/CMS";
import LanguageContext from "../../../helper/LanguageContext";
import SearchContext from "../SearchContext";

const SearchStateLogic = () => {
    const { language } = useContext(LanguageContext);
    const { search } = useContext(SearchContext);

    // Text content
    const { error, data } = useQuery(GET_SEARCH_STATE, {
        variables: { language },
    });

    const searchStateContent = data ? data.searches[0] : [];

    return { search, error, searchStateContent };
};

export default SearchStateLogic;
