import DemoLogic from "./Demo.logic";
import ServicesOutput from "../../components/Services/ServicesOutput/ServicesOutput";
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

const Demo = ({ description, title }: Props) => {
    const { similar, handleSimilar, useHandleDemoChange } = DemoLogic();
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
                    <StyledContainer className="demo-output">
                        <ServicesOutput services={similar} />
                    </StyledContainer>
                )}
            </StyledDemo>
        </StyledPageContainer>
    );
};

export default Demo;
