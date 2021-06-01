import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { GET_SEARCH_FILTERS } from "../../../helper/CMS";
import LanguageContext from "../../../helper/LanguageContext";

const ServicesFilterLogic = () => {
    // Text content
    const { language } = useContext(LanguageContext);
    const { error, data } = useQuery(GET_SEARCH_FILTERS, {
        variables: { language },
    });

    const filterOptions = data ? data.searchFilters : [];

    return { error, filterOptions };
};

export default ServicesFilterLogic;
