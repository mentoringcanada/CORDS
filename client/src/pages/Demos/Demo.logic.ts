import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { getSearchResults } from "../../helper/API";
import { GET_DEMO_CONTENT } from "../../helper/CMS";
import LanguageContext from "../../helper/LanguageContext";

const DemoLogic = () => {
    const [similarResults, setSimilarResults] = useState<any>({
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

    // Text content
    const { language } = useContext(LanguageContext);
    const { error, data } = useQuery(GET_DEMO_CONTENT, {
        variables: { language },
    });
    const demoContent = data ? data.demos[0] : {};

    return {
        language,
        similarResults,
        handleSimilar,
        useHandleDemoChange,
        error,
        demoContent,
    };
};

export default DemoLogic;
