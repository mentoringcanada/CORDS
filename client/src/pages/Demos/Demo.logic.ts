import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { getSearchResults } from "../../helper/API";
import { GET_DEMO_CONTENT } from "../../helper/CMS";
import LanguageContext from "../../helper/LanguageContext";
import { useQueryParams } from "../../helper/Services";
import { Search, SearchBody, Service } from "../../types";

const DemoLogic = (description: string) => {
    const query = useQueryParams();
    const page = Number(query.get("page"));
    const queryValue = String(query.get("query"));
    const [services, setServices] = useState<Service[]>([]);
    const [maxPages, setMaxPages] = useState(2);
    const [search, setSearch] = useState<Search>({
        query: description,
        distance: 50,
        filter: "best",
        state: "",
        location: {
            lat: undefined,
            lng: undefined,
        },
    });

    const useHandleDemoChange = (description: string) => {
        useEffect(() => {
            setSearch({
                ...search,
                query: description,
            });
        }, [description]);
    };

    const handleDemo = () => {
        const searchBody: SearchBody = {
            query: search.query,
            page,
        };
        setSearch({ ...search, state: "searching" });
        getSearchResults(searchBody)
            .then((res) => {
                if (Array.isArray(res) && !res.length) {
                    setSearch({ ...search, state: "no-results" });
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
                setServices([]);
            });
    };

    const useOnPageChange = (page: number) => {
        useEffect(() => {
            if (page !== 0) {
                handleDemo();
            }
        }, [page]);
    };

    const useSetState = () => {
        useEffect(() => {
            setSearch({
                ...search,
                query: queryValue !== "null" ? queryValue : "",
            });
        }, []);
    };

    // Text content
    const { language } = useContext(LanguageContext);
    const { error, data } = useQuery(GET_DEMO_CONTENT, {
        variables: { language },
    });
    const demoContent = data ? data.demos[0] : {};

    return {
        useHandleDemoChange,
        error,
        demoContent,
        search,
        setSearch,
        handleDemo,
        services,
        maxPages,
        useOnPageChange,
        page,
        useSetState,
        language,
    };
};

export default DemoLogic;
