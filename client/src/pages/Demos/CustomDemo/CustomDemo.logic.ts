import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { GET_CUSTOM_DEMO_CONTENT } from "../../../helper/CMS";
import LanguageContext from "../../../helper/LanguageContext";

const CustomDemoLogic = () => {
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
    };
};

export default CustomDemoLogic;
