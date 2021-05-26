import DemoLogic from "./Demo.logic";
import ServicesOutput from "../../components/Services/ServicesOutput/ServicesOutput";
import {
    StyledDefaultInfo,
    StyledDemo,
    StyledViewSimilarButton,
} from "./Demo.styles";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import { StyledContainer } from "../../styles/StyledContainer";
import DemoInfo from "./DemoInfo/DemoInfo";

interface Props {
    description: string;
    title: string;
}

const Demo = ({ description, title }: Props) => {
    const { similarResults, handleSimilar, useHandleDemoChange } = DemoLogic();
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
                            className="demo"
                        >
                            View similar services
                        </StyledViewSimilarButton>
                    </StyledDefaultInfo>
                </StyledContainer>
                <DemoInfo explanation="Each demo represents a fictitious organization's website with a name and description. By clicking the 'view similar' button you search our services database for ones similar to this organization. This is intended to be used on service websites to connect organizations over the web by showing users other services they might be interested in." />
                {similarResults.services &&
                    similarResults.services.length !== 0 && (
                        <StyledContainer className="demo-output">
                            <ServicesOutput serviceResults={similarResults} />
                        </StyledContainer>
                    )}
            </StyledDemo>
        </StyledPageContainer>
    );
};

export default Demo;
