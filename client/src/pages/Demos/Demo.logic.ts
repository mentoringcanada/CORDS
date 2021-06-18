import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { getSearchResults } from "../../helper/API";
import { GET_DEMO_CONTENT } from "../../helper/CMS";
import LanguageContext from "../../helper/LanguageContext";
import { Service } from "../../types";

const DemoLogic = () => {
    const [similarResults, setSimilarResults] = useState<any>({
        services: [],
        location: {
            lat: undefined,
            lng: undefined,
        },
    });

    const getName = (service: Service) => {
        let name =
            language === "fr-CA" && service.nom !== ""
                ? service.nom
                : service.name;

        name = name.replace(/[\u{0080}-\u{FFFF}]/gu, "");
        return name;
    };

    const getDescription = (service: Service) => {
        let desc =
            language === "fr-CA" && service.description_fr !== ""
                ? service.description_fr
                : service.description;

        desc = desc.replace(/[\u{0080}-\u{FFFF}]/gu, "");
        return desc;
    };

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
        similarResults,
        handleSimilar,
        useHandleDemoChange,
        error,
        demoContent,
        getDescription,
        getName,
    };
};

export default DemoLogic;
