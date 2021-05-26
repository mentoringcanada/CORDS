import { useEffect, useState } from "react";
import { getSearchResults } from "../../helper/API";
import { SearchResults } from "../../types";

const DemoLogic = () => {
    const [similarResults, setSimilarResults] = useState<SearchResults>({
        services: [],
        location: {
            lat: undefined,
            lng: undefined,
        },
    });
    const handleSimilar = (description: string) => {
        const searchBody = {
            search: description,
        };
        getSearchResults(searchBody).then((res) =>
            setSimilarResults({
                ...similarResults,
                services: res,
            })
        );
    };

    const useHandleDemoChange = (description: string) => {
        useEffect(() => {
            setSimilarResults({
                services: [],
                location: {
                    lat: undefined,
                    lng: undefined,
                },
            });
        }, [description]);
    };

    return { similarResults, handleSimilar, useHandleDemoChange };
};

export default DemoLogic;
