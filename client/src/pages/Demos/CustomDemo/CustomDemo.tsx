import ServicesOutput from "../../../components/Services/ServicesOutput/ServicesOutput";
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

const CustomDemo = () => {
    const { similarResults, handleSimilar, useHandleDemoChange } = DemoLogic();
    const {
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
                </StyledContainer>
                <DemoInfo
                    explanation={customDemoContent.customExplanation}
                    openText={customDemoContent.infoOpenText}
                    closeText={customDemoContent.infoCloseText}
                />
                {similarResults.services &&
                    similarResults.services.length !== 0 && (
                        <ServicesOutput
                            serviceResults={similarResults}
                        ></ServicesOutput>
                    )}
            </StyledDemo>
        </StyledPageContainer>
    );
};

export default CustomDemo;
