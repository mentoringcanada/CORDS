import { useContext, useState } from "react";
import LanguageContext from "../../helper/LanguageContext";
import { useQueryParams } from "../../helper/Services";
import { Search } from "../../types";

const SearchLogic = () => {
    const { language } = useContext(LanguageContext);
    const query = useQueryParams();
    const params = {
        query: String(query.get("query")),
        distance: Number(query.get("distance")),
        lat: Number(query.get("lat")),
        lng: Number(query.get("lng")),
        page: Number(query.get("page")),
        filter: String(query.get("filter")),
        source: query.get("source"),
    };
    const [search, setSearch] = useState<Search>({
        query: params.query !== "null" ? params.query : "",
        distance: params.distance !== 0 ? params.distance : 100,
        filter: params.filter !== "null" ? params.filter : "best",
        dataSource:
            params.source !== null ? params.source?.split(",") : ["211"],
        historyLog: [],
        state: "",
        location: {
            lat: params.lat !== 0 ? params.lat : undefined,
            lng: params.lng !== 0 ? params.lng : undefined,
        },
    });

    return {
        search,
        setSearch,
        language,
    };
};

export default SearchLogic;
