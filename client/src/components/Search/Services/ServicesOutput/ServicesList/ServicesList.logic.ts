import { useContext } from "react";
import LanguageContext from "../../../../../helper/LanguageContext";
import { Service } from "../../../../../types";

const ServicesListLogic = () => {
    const { language } = useContext(LanguageContext);

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

    return {
        language,
        getName,
        getDescription,
    };
};
export default ServicesListLogic;
