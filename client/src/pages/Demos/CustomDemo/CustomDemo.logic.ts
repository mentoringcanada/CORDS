import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { GET_CUSTOM_DEMO_CONTENT } from "../../../helper/CMS";
import LanguageContext from "../../../helper/LanguageContext";
import { useQueryParams } from "../../../helper/Services";

const CustomDemoLogic = () => {
    const params = useQueryParams();
    const title = String(params.get("title"));
    const query = String(params.get("query"));
    const [titleValue, setTitleValue] = useState("");
    const [queryValue, setQueryValue] = useState("");

    const useSetCustomState = () => {
        useEffect(() => {
            if (title !== "null") {
                setTitleValue(title);
            }
            if (query !== "null") {
                setQueryValue(query);
            }
        }, []);
    };

    // Text content
    const { language } = useContext(LanguageContext);
    const { error, data } = useQuery(GET_CUSTOM_DEMO_CONTENT, {
        variables: { language },
    });
    const customDemoContent = data ? data.demos[0] : {};

    return {
        language,
        error,
        customDemoContent,
        title,
        useSetCustomState,
        titleValue,
        setTitleValue,
        queryValue,
        setQueryValue,
    };
};

export default CustomDemoLogic;
