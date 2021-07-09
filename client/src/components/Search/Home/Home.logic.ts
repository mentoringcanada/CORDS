import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { GET_HOME_CONTENT } from "../../../helper/CMS";
import LanguageContext from "../../../helper/LanguageContext";

const HomeLogic = () => {
    // Text content
    const { language } = useContext(LanguageContext);
    const { error, data } = useQuery(GET_HOME_CONTENT, {
        variables: { language },
    });

    const homeContent = data ? data.homes[0] : {};

    return { error, homeContent };
};

export default HomeLogic;
