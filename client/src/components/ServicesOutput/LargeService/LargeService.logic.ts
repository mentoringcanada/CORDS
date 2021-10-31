import { useQuery } from "@apollo/client";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getService, getSimilar } from "../../../helper/API";
import { GET_LARGE_SERVICE } from "../../../helper/CMS";
import LanguageContext from "../../../helper/LanguageContext";
import { useQueryParams } from "../../../helper/Services";
import { Service, SimilarBody } from "../../../types";
import SearchContext from "../../../pages/Search/SearchContext";

interface Params {
    id: string;
}

const LargeServiceLogic = () => {
    const [similar, setSimilar] = useState<Service[]>([]);
    const [service, setService] = useState<Service>();
    const [maxPages, setMaxPages] = useState<number>(2);
    const { search, setSearch } = useContext(SearchContext);
    const { language } = useContext(LanguageContext);
    const { id } = useParams<Params>();
    const query = useQueryParams();
    const page = Number(query.get("page"));

    const useSetState = (id: number, page: number) => {
        useEffect(() => {
            const similarBody: SimilarBody = {
                resourceId: Number(id),
                lat: Number(query.get("lat")),
                lng: Number(query.get("lng")),
                distance: Number(query.get("distance")),
                page,
            };
            setSearch({
                ...search,
                historyLog: search.historyLog.push(`${id}`),
            });
            setSearch({ ...search, state: "searching" });
            // Gets service data on component startup
            getService(similarBody).then((res) => {
                setService(res);
            });
            getSimilar(similarBody)
                .then((res) => {
                    if (page === 1) {
                        setSimilar(res.items.slice(1));
                    } else {
                        setSimilar(res.items);
                    }
                    setSearch({
                        ...search,
                        state: "",
                    });
                    setMaxPages(Math.ceil(res.totalResults / 10));
                    console.log("no error");
                })
                .catch(() => {
                    setSearch({ ...search, state: "error", services: [] });
                });
        }, [id, page]);
    };

    // Text content
    const { error, data } = useQuery(GET_LARGE_SERVICE, {
        variables: { language },
    });

    const largeServiceContent = data ? data.largeServices[0] : [];

    return {
        language,
        similar,
        service,
        useSetState,
        largeServiceContent,
        error,
        maxPages,
        id,
        page,
    };
};

export default LargeServiceLogic;
