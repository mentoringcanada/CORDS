import ServiceList from "../../../components/Services/ServiceList/ServiceList";
import LargeService from "../../../components/Services/LargeService/LargeService";
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
import { StyledOutputBox } from "../../../styles/StyledOutputBox";

const CustomDemo = () => {
    const { similar, focus, setFocus, handleSimilar, useHandleDemoChange } =
        DemoLogic();
    const { description, title, handleDescriptionChange, handleTitleChange } =
        CustomDemoLogic();
    useHandleDemoChange("");

    return (
        <StyledPageContainer>
            <StyledDemo>
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
                {similar && similar.length !== 0 && (
                    <StyledContainer className="demo-output">
                        <StyledOutputBox>
                            {focus ? (
                                <LargeService id={focus} setFocus={setFocus} />
                            ) : (
                                <ServiceList
                                    services={similar}
                                    setFocus={setFocus}
                                />
                            )}
                        </StyledOutputBox>
                    </StyledContainer>
                )}
            </StyledDemo>
        </StyledPageContainer>
    );
};

export default CustomDemo;
