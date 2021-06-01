import { useContext } from "react";
import LanguageContext from "../../../helper/LanguageContext";
import { Service } from "../../../types";

const ServicesListLogic = () => {
    const { language } = useContext(LanguageContext);

    const getName = (service: Service) => {
        return language === "fr-CA" && service.nom !== ""
            ? service.nom
            : service.name;
    };

    const getDescription = (service: Service) => {
        return language === "fr-CA" && service.description_fr !== ""
            ? service.description_fr
            : service.description;
    };

    return {
        language,
        getName,
        getDescription,
    };
};
export default ServicesListLogic;
