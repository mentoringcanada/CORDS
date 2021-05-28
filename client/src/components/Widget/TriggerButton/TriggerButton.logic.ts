import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { GET_WIDGET_CONTENT } from "../../../helper/CMS";
import LanguageContext from "../../../helper/LanguageContext";

const TriggerButtonLogic = () => {
    const { language } = useContext(LanguageContext);

    const { error, data } = useQuery(GET_WIDGET_CONTENT, {
        variables: { language },
    });
    const widgetContent = data ? data.widgets[0] : {};

    return { error, widgetContent };
};

export default TriggerButtonLogic;
