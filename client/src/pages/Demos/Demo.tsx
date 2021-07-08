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
import SearchState from "../../components/Search/SearchState/SearchState";
import ServicesList from "../../components/ServicesOutput/ServicesList/ServicesList";
import { useHistory } from "react-router-dom";

interface Props {
    description: string;
    title: string;
}

const Demo = ({ description, title }: Props) => {
    const {
        useHandleDemoChange,
        error,
        demoContent,
        handleDemo,
        search,
        setSearch,
        services,
        maxPages,
        useOnPageChange,
        page,
    } = DemoLogic(description);
    useHandleDemoChange(description);
    useOnPageChange(page);
    const history = useHistory();

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
                                onClick={() => {
                                    history.push({
                                        pathname: history.location.pathname,
                                        search: "?page=1",
                                    });
                                    handleDemo();
                                }}
                                className="demo"
                            >
                                {demoContent.buttonText}
                            </StyledViewSimilarButton>
                        </StyledDefaultInfo>
                        <DemoInfo explanation={demoContent.explanation} />
                    </StyledContainer>
                    <SearchState />
                    <ServicesList
                        type="demo"
                        services={services}
                        maxPages={maxPages}
                    />
                </StyledDemo>
            </SearchContext.Provider>
        </StyledPageContainer>
    );
};

export default Demo;
