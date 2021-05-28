import { useContext } from "react";
import LanguageContext from "../../helper/LanguageContext";

const LanguageToggleLogic = () => {
    const { language, setLanguage } = useContext(LanguageContext);

    const handleLanguageToggle = () => {
        if (language === "en") {
            setLanguage("fr-CA");
        } else {
            setLanguage("en");
        }
    };

    return { language, handleLanguageToggle };
};

export default LanguageToggleLogic;
