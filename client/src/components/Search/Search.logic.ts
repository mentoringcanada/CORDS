import { useState } from "react";
import { useQueryParams } from "../../helper/Services";
import { Search } from "../../types";

const SearchLogic = () => {
    const query = useQueryParams();
    const params = {
        query: String(query.get("query")),
        distance: Number(query.get("distance")),
        lat: Number(query.get("lat")),
        lng: Number(query.get("lng")),
        page: Number(query.get("page")),
        filter: String(query.get("filter")),
    };
    const [search, setSearch] = useState<Search>({
        query: params.query !== "null" ? params.query : "",
        distance: params.distance || 50,
        filter: params.filter !== "null" ? params.filter : "best",
        state: "",
        location: {
            lat: params.lat || undefined,
            lng: params.lng || undefined,
        },
    });

    // const handleSelections = (page: number) => {
    //     //     setSearch({ ...search, state: "searching" });
    //     //     getSelections(page)
    //     //         .then((res) => {
    //     //             if (Array.isArray(res) && !res.length) {
    //     //                 setSearch({
    //     //                     ...search,
    //     //                     selections: [],
    //     //                     state: "no-results",
    //     //                 });
    //     //             } else {
    //     //                 setSearch({
    //     //                     ...search,
    //     //                     state: "selections",
    //     //                 });
    //     //             }
    //     //         })
    //     //         .catch(() => {
    //     //             setSearch({ ...search, selections: [], state: "error" });
    //     //         });
    // };

    return {
        search,
        setSearch,
    };
};

export default SearchLogic;
