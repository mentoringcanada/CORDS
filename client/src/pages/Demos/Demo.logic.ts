import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { getGeoSearchResults } from "../../helper/API";
import { GET_DEMO_CONTENT } from "../../helper/CMS";
import LanguageContext from "../../helper/LanguageContext";
import { GeoSearchBody, Search } from "../../types";

const DemoLogic = () => {
    const [search, setSearch] = useState<Search>({
        query: "",
        distance: 50,
        filter: "best",
        state: "",
        services: [],
        location: {
            lat: 43.6532,
            lng: -79.3832,
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

    const handleGeoSearch = (page: number) => {
        const geoSearch: GeoSearchBody = {
            distance: search.distance,
            lat: search.location.lat,
            lng: search.location.lng,
            query: search.query,
            page,
        };

        if (page === 1) {
            setSearch({ ...search, state: "searching", services: [] });
        } else {
            setSearch({ ...search, state: "searching" });
        }
        getGeoSearchResults(geoSearch).then((res) => {
            if (Array.isArray(res) && !res.length) {
                setSearch({ ...search, state: "no-results" });
            } else {
                setSearch({
                    ...search,
                    state: "",
                    services: res,
                });
            }
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
        handleGeoSearch,
    };
};

export default DemoLogic;
