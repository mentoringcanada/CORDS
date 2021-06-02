import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { GET_SEARCH_INPUT_CONTENT } from "../../helper/CMS";
import LanguageContext from "../../helper/LanguageContext";
import { GeoSearchBody } from "../../types";

const SearchInputLogic = () => {
    const [geoSearchBody, setGeoSearchBody] = useState<GeoSearchBody>({
        search: "",
        location: {
            lat: undefined,
            lng: undefined,
        },
        distance: 50,
    });

    // Text content
    const { language } = useContext(LanguageContext);
    const { error, data } = useQuery(GET_SEARCH_INPUT_CONTENT, {
        variables: { language },
    });

    const searchInputContent = data ? data.searches[0] : [];

    return {
        geoSearchBody,
        setGeoSearchBody,
        error,
        searchInputContent,
    };
};

export default SearchInputLogic;
