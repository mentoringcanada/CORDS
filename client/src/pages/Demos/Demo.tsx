import DemoLogic from "./Demo.logic";
import ServiceList from "../../components/Services/ServiceList/ServiceList";
import LargeService from "../../components/Services/LargeService/LargeService";
import {
    StyledDefaultInfo,
    StyledDemo,
    StyledViewSimilarButton,
} from "./Demo.styles";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import { StyledContainer } from "../../styles/StyledContainer";
import { StyledOutputBox } from "../../styles/StyledOutputBox";

interface Props {
    description: string;
    title: string;
}

const Demo = ({ description, title }: Props) => {
    const { similar, focus, setFocus, handleSimilar, useHandleDemoChange } =
        DemoLogic();
    useHandleDemoChange(description);

    return (
        <StyledPageContainer>
            <StyledDemo>
                <StyledContainer>
                    <StyledDefaultInfo>
                        <h2>{title}</h2>
                        <p>{description}</p>
                        <StyledViewSimilarButton
                            onClick={() => handleSimilar(description)}
                        >
                            View similar services
                        </StyledViewSimilarButton>
                    </StyledDefaultInfo>
                </StyledContainer>
                {similar && similar.length !== 0 && (
                    <StyledContainer className="output">
                        <StyledOutputBox data-testid="output-box">
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

export default Demo;
