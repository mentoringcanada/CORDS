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
    const {
        similarResults,
        handleSimilar,
        useHandleDemoChange,
        error,
        demoContent,
    } = DemoLogic();
    useHandleDemoChange(description);

    if (error) {
        return <p>Content collection error...</p>;
    }

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
                            {demoContent.buttonText}
                        </StyledViewSimilarButton>
                    </StyledDefaultInfo>
                </StyledContainer>
                <DemoInfo
                    explanation={demoContent.explanation}
                    openText={demoContent.infoOpenText}
                    closeText={demoContent.infoCloseText}
                />
                {similarResults.services &&
                    similarResults.services.length !== 0 && (
                        <ServicesOutput serviceResults={similarResults} />
                    )}
            </StyledDemo>
        </StyledPageContainer>
    );
};

export default Demo;
