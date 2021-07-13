import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_DEMO_PAGES } from "./helper/CMS";
import { setSession } from "./helper/API";

const AppLogic = () => {
    const [language, setLanguage] = useState("en");

    const { error, data } = useQuery(GET_DEMO_PAGES, {
        variables: { language },
    });
    const demoPages = data ? data.demoPages : [];

    const useOnStartup = () => {
        useEffect(() => {
            setSession().catch(() =>
                console.log("Error setting session token")
            );
        }, []);
    };

    return {
        data,
        language,
        setLanguage,
        error,
        demoPages,
        useOnStartup,
    };
};

export default AppLogic;
