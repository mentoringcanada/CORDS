import DemoLogic from "./Demo.logic";
import {
    StyledDefaultInfo,
    StyledDemo,
    StyledViewSimilarButton,
} from "./Demo.styles";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import { StyledContainer } from "../../styles/StyledContainer";
import DemoInfo from "./DemoInfo/DemoInfo";
import SmallService from "../../components/Search/ServicesOutput/SmallService/SmallService";
import { Service } from "../../types";
import { getDescription, getName } from "../../helper/Services";

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
        language,
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
                    <DemoInfo explanation={demoContent.explanation} />
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
                        type={"demo"}
                    />
                ))}
            </StyledDemo>
        </StyledPageContainer>
    );
};

export default Demo;
