import { useContext } from "react";
import { useHistory } from "react-router-dom";
import LanguageContext from "../../helper/LanguageContext";

const LanguageToggleLogic = () => {
    const { language, setLanguage } = useContext(LanguageContext);
    const history = useHistory();

    const handleLanguageToggle = () => {
        if (language === "en") {
            setLanguage("fr-CA");
            history.push({
                pathname: history.location.pathname,
                search: history.location.search.replace("en", "fr-CA"),
            });
        } else {
            setLanguage("en");
            history.push({
                pathname: history.location.pathname,
                search: history.location.search.replace("fr-CA", "en"),
            });
        }
    };

    return { language, handleLanguageToggle };
};

export default LanguageToggleLogic;
