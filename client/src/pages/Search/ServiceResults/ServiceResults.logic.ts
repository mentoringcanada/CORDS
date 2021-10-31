import { useContext, useEffect, useState } from "react";
import { getGeoSearchResults } from "../../../helper/API";
import { useQueryParams } from "../../../helper/Services";
import { Service } from "../../../types";
import SearchContext from "../SearchContext";

const ServiceResultsLogic = () => {
    const { search, setSearch } = useContext(SearchContext);
    const [maxPages, setMaxPages] = useState(2);
    const [services, setServices] = useState<Service[]>([]);

    const query = useQueryParams();
    const params = {
        query: String(query.get("query")),
        distance: Number(query.get("distance")),
        lat: Number(query.get("lat")),
        lng: Number(query.get("lng")),
        page: Number(query.get("page")),
        filter: String(query.get("filter")),
    };

    const useSetState = (
        distance: any,
        lat: any,
        lng: any,
        page: any,
        query: any
    ) => {
        useEffect(() => {
            setSearch({ ...search, state: "searching" });

            getGeoSearchResults(params, search.dataSource)
                .then((res) => {
                    if (Array.isArray(res) && !res.length) {
                        setSearch({
                            ...search,
                            state: "no-results",
                        });
                    } else {
                        setSearch({
                            ...search,
                            state: "",
                        });
                        setServices(res.items);
                        setMaxPages(Math.ceil(res.totalResults / 10));
                    }
                })
                .catch(() => {
                    setSearch({ ...search, state: "error" });
                });
        }, [distance, lat, lng, page, query]);
    };

    const getServices: () => Service[] = () => {
        if (search.filter === "proximity") {
            return services
                .concat()
                .sort((a: any, b: any) => a.distance - b.distance);
        } else {
            return services;
        }
    };

    return { maxPages, getServices, useSetState, params };
};

export default ServiceResultsLogic;
