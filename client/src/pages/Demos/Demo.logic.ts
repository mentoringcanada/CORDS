import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { getSearchResults } from "../../helper/API";
import { GET_DEMO_CONTENT } from "../../helper/CMS";
import LanguageContext from "../../helper/LanguageContext";
import { Search, SearchBody } from "../../types";

const DemoLogic = () => {
    const [search, setSearch] = useState<Search>({
        query: "",
        distance: 50,
        filter: "best",
        state: "",
        services: [],
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

    const handleSearch = (page: number) => {
        const searchBody: SearchBody = {
            query: search.query,
            page,
        };

        if (page === 1) {
            setSearch({ ...search, state: "searching", services: [] });
        } else {
            setSearch({ ...search, state: "searching" });
        }
        getSearchResults(searchBody)
            .then((res) => {
                if (Array.isArray(res) && !res.length) {
                    setSearch({ ...search, state: "no-results" });
                } else {
                    setSearch({
                        ...search,
                        state: "",
                        services: res,
                    });
                }
            })
            .catch(() => {
                setSearch({ ...search, state: "error", services: [] });
            });
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
        handleSearch,
    };
};

export default DemoLogic;
