import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_DEMO_PAGES } from "./helper/CMS";
import { setSession } from "./helper/API";
import { useQueryParams } from "./helper/Services";

const AppLogic = () => {
    const query = useQueryParams();
    const ln = query.get("ln");
    const [language, setLanguage] = useState(ln !== null ? ln : "en");

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
