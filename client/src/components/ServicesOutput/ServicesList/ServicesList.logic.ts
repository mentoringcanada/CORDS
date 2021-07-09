import { useContext } from "react";
import LanguageContext from "../../../helper/LanguageContext";

const ServicesListLogic = () => {
    const { language } = useContext(LanguageContext);

    return {
        language,
    };
};
export default ServicesListLogic;
