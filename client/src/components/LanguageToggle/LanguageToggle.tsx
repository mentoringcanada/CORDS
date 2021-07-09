import LanguageToggleLogic from "./LanguageToggle.logic";
import { StyledLanguageToggle } from "./LanguageToggle.styles";

const LanguageToggle = () => {
    const { language, handleLanguageToggle } = LanguageToggleLogic();

    return (
        <StyledLanguageToggle onClick={handleLanguageToggle}>
            {language === "en" ? "FR" : "EN"}
        </StyledLanguageToggle>
    );
};

export default LanguageToggle;
