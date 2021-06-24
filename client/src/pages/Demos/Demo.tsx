import DemoLogic from "./Demo.logic";
import {
    StyledDefaultInfo,
    StyledDemo,
    StyledViewSimilarButton,
} from "./Demo.styles";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import { StyledContainer } from "../../styles/StyledContainer";
import DemoInfo from "./DemoInfo/DemoInfo";
import SearchContext from "../../components/Search/SearchContext";
import ServiceOutput from "../../components/Search/ServicesOutput/ServicesOutput";
import SearchState from "../../components/Search/SearchState/SearchState";

interface Props {
    description: string;
    title: string;
}

const Demo = ({ description, title }: Props) => {
    const {
        useHandleDemoChange,
        error,
        demoContent,
        handleSearch,
        search,
        setSearch,
    } = DemoLogic();
    useHandleDemoChange(description);

    if (error) {
        return <p>Content collection error...</p>;
    }

    return (
        <StyledPageContainer>
            <SearchContext.Provider value={{ search, setSearch }}>
                <StyledDemo>
                    <StyledContainer>
                        <StyledDefaultInfo>
                            <h2>{title}</h2>
                            <p>{description}</p>
                            <StyledViewSimilarButton
                                onClick={() => handleSearch(1)}
                                className="demo"
                            >
                                {demoContent.buttonText}
                            </StyledViewSimilarButton>
                        </StyledDefaultInfo>
                        <DemoInfo explanation={demoContent.explanation} />
                    </StyledContainer>
                    <SearchState />
                    <ServiceOutput handleServices={handleSearch} />
                </StyledDemo>
            </SearchContext.Provider>
        </StyledPageContainer>
    );
};

export default Demo;
