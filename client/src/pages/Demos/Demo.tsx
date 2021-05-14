import DemoLogic from "./Demo.logic";
import OutputBox from "../../components/OutputBox/OutputBox";
import ServiceList from "../../components/Services/ServiceList/ServiceList";
import LargeService from "../../components/Services/LargeService/LargeService";
import {
    StyledDefaultInfo,
    StyledDemo,
    StyledViewSimilarButton,
} from "./Demo.styles";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import { StyledContainer } from "../../styles/StyledContainer";

interface Props {
    description: string;
    title: string;
}

const Demo = (props: Props) => {
    const { similar, focus, setFocus, handleSimilar, useHandleDemoChange } =
        DemoLogic();
    const description: string = props.description;
    const title: string = props.title;
    useHandleDemoChange(description);

    return (
        <StyledPageContainer>
            <StyledDemo>
                <StyledContainer>
                    <StyledDefaultInfo>
                        <h2>{title}</h2>
                        <p>{description}</p>
                        {similar}
                        <StyledViewSimilarButton
                            onClick={() => handleSimilar(description)}
                        >
                            View similar services
                        </StyledViewSimilarButton>
                    </StyledDefaultInfo>
                </StyledContainer>
                {similar && similar.length !== 0 && (
                    <StyledContainer>
                        <OutputBox data-testid="output-box">
                            {focus ? (
                                <LargeService id={focus} setFocus={setFocus} />
                            ) : (
                                <ServiceList
                                    services={similar}
                                    setFocus={setFocus}
                                />
                            )}
                        </OutputBox>
                    </StyledContainer>
                )}
            </StyledDemo>
        </StyledPageContainer>
    );
};

export default Demo;