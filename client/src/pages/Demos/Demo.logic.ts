import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { getSearchResults } from "../../helper/API";
import { GET_DEMO_CONTENT } from "../../helper/CMS";
import LanguageContext from "../../helper/LanguageContext";
import { useQueryParams } from "../../helper/Services";
import { SearchBody, Service } from "../../types";

const DemoLogic = () => {
    const params = useQueryParams();
    const page = Number(params.get("page"));
    const name = String(params.get("title"));
    const query = String(params.get("query"));
    const [titleValue, setTitleValue] = useState("");
    const [queryValue, setQueryValue] = useState("");
    const [services, setServices] = useState<Service[]>([]);
    const [maxPages, setMaxPages] = useState(2);
    const [search, setSearch] = useState<any>({
        query: query,
        distance: 50,
        filter: "best",
        state: "",
        location: {
            lat: undefined,
            lng: undefined,
        },
    });

    const useHandleDemoChange = (description: string = "") => {
        useEffect(() => {
            setSearch({
                ...search,
                query: description,
            });
        }, [description]);
    };

    const useSetState = (page: number, query: string, title: string) => {
        useEffect(() => {
            if (title !== "null") {
                setTitleValue(title);
            }
            if (query !== "null") {
                setQueryValue(query);
            }
            if (page !== 0) {
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
            }
        }, [page, title, query]);
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
        services,
        maxPages,
        useSetState,
        page,
        language,
        titleValue,
        setTitleValue,
        queryValue,
        setQueryValue,
        name,
        query,
    };
};

export default DemoLogic;
