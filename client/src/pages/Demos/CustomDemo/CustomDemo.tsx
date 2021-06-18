import { MdEdit } from "react-icons/md";
import DemoLogic from "../Demo.logic";
import CustomDemoLogic from "./CustomDemo.logic";
import {
    StyledCustomInputs,
    StyledDemo,
    StyledViewSimilarButton,
} from "../Demo.styles";
import { StyledPageContainer } from "../../../styles/StyledPageContainer";
import { StyledContainer } from "../../../styles/StyledContainer";
import DemoInfo from "../DemoInfo/DemoInfo";
import SmallService from "../../../components/Search/ServicesOutput/SmallService/SmallService";
import { Service } from "../../../types";
import { getDescription, getName } from "../../../helper/Services";

const CustomDemo = () => {
    const { similarResults, handleSimilar, useHandleDemoChange } = DemoLogic();
    const {
        language,
        description,
        title,
        handleDescriptionChange,
        handleTitleChange,
        error,
        customDemoContent,
    } = CustomDemoLogic();
    useHandleDemoChange("");

    if (error) {
        return <p>Content collection error...</p>;
    }

    return (
        <StyledPageContainer>
            <StyledDemo>
                <StyledContainer>
                    <StyledCustomInputs>
                        <h2>{customDemoContent.customTitle}</h2>
                        <label className="title">
                            <input
                                type="text"
                                placeholder={
                                    customDemoContent.customNamePlaceholder
                                }
                                value={title}
                                onChange={handleTitleChange}
                                style={{ width: !title ? "6rem" : "100%" }}
                            />
                            <MdEdit />
                        </label>
                        <label className="desc">
                            <input
                                type="text"
                                placeholder={
                                    customDemoContent.customDescriptionPlaceholder
                                }
                                value={description}
                                onChange={handleDescriptionChange}
                                style={{
                                    width: !description ? "6rem" : "100%",
                                }}
                            />
                            <MdEdit />
                        </label>
                    </StyledCustomInputs>
                    <StyledViewSimilarButton
                        className="demo"
                        onClick={() => handleSimilar(description)}
                    >
                        {customDemoContent.buttonText}
                    </StyledViewSimilarButton>
                    <DemoInfo
                        explanation={customDemoContent.customExplanation}
                    />
                </StyledContainer>
                {similarResults.services.map((service: Service) => (
                    <SmallService
                        key={service.item_id}
                        id={service.item_id}
                        name={getName(service, language)}
                        link={service.link}
                        description={getDescription(service, language)}
                        setFocus={() => ""}
                        distance={service.distance}
                        data-testid="small-service"
                        type={"customDemo"}
                    />
                ))}
            </StyledDemo>
        </StyledPageContainer>
    );
};

export default CustomDemo;
