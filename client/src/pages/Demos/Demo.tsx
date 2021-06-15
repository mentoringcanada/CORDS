import DemoLogic from "./Demo.logic";
import {
    StyledDefaultInfo,
    StyledDemo,
    StyledViewSimilarButton,
} from "./Demo.styles";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import { StyledContainer } from "../../styles/StyledContainer";
import DemoInfo from "./DemoInfo/DemoInfo";
import ServicesList from "../../components/Search/Services/ServicesOutput/ServicesList/ServicesList";
import { useState } from "react";
import LargeService from "../../components/Search/Services/ServicesOutput/LargeService/LargeService";

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
    const [focus, setFocus] = useState<number | null>(null);

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
                            type="similar"
                            services={similarResults.services}
                            setFocus={setFocus}
                        />
                    )
                )}
            </StyledDemo>
        </StyledPageContainer>
    );
};

export default Demo;
