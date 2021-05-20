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
    const { description, title, handleDescriptionChange, handleTitleChange } =
        CustomDemoLogic();
    useHandleDemoChange("");

    return (
        <StyledPageContainer>
            <StyledDemo>
                <DemoInfo
                    title="Custom Demo Help"
                    description="In the custom demo you can create a fictitious organization with a personalized name and description. By clicking the 'view similar' button you search our services database for ones similar to your own. This is intended to be used on service websites to
                    connect organizations over the web by showing users
                    other services they might be interested in."
                />
                <StyledContainer>
                    <StyledCustomInputs>
                        <h2>Custom Organization</h2>
                        <label className="title">
                            <input
                                type="text"
                                placeholder="Name"
                                value={title}
                                onChange={handleTitleChange}
                                style={{ width: !title ? "6rem" : "100%" }}
                            />
                            <MdEdit />
                        </label>
                        <label className="desc">
                            <input
                                type="text"
                                placeholder="Description"
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
                        View similar services
                    </StyledViewSimilarButton>
                </StyledContainer>
                {similarResults.services &&
                    similarResults.services.length !== 0 && (
                        <StyledContainer className="demo-output">
                            <ServicesOutput
                                serviceResults={similarResults}
                            ></ServicesOutput>
                        </StyledContainer>
                    )}
            </StyledDemo>
        </StyledPageContainer>
    );
};

export default CustomDemo;
