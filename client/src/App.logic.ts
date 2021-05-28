import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_DEMO_PAGES } from "./helper/CMS";

const AppLogic = () => {
    const [language, setLanguage] = useState("en");

    const { error, data } = useQuery(GET_DEMO_PAGES, {
        variables: { language },
    });
    const demoPages = data ? data.demoPages : [];

    return {
        data,
        language,
        setLanguage,
        error,
        demoPages,
    };
};

export default AppLogic;
