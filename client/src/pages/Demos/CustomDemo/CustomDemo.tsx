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
import LargeService from "../../../components/Search/Services/ServicesOutput/LargeService/LargeService";
import ServicesList from "../../../components/Search/Services/ServicesOutput/ServicesList/ServicesList";
import { useState } from "react";

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
    const [focus, setFocus] = useState<number | null>(null);

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
                {focus ? (
                    <LargeService
                        id={focus}
                        setFocus={setFocus}
                        location={{ lat: 0, lng: 0 }}
                    />
                ) : (
                    similarResults.services &&
                    similarResults.services.length !== 0 && (
                        <ServicesList
                            services={similarResults.services}
                            setFocus={setFocus}
                            type="similar"
                        />
                    )
                )}
            </StyledDemo>
        </StyledPageContainer>
    );
};

export default CustomDemo;
