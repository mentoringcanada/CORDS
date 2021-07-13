import DemoLogic from "./Demo.logic";
import {
    StyledDefaultInfo,
    StyledDemo,
    StyledViewSimilarButton,
} from "./Demo.styles";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import { StyledContainer } from "../../styles/StyledContainer";
import DemoInfo from "./DemoInfo/DemoInfo";
import ServicesList from "../../components/ServicesOutput/ServicesList/ServicesList";
import { useHistory } from "react-router-dom";
import SearchContext from "../Search/SearchContext";
import SearchState from "../Search/SearchState/SearchState";
import { addSelection } from "../../helper/API";

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
                        handleSelect={(id: string) =>
                            addSelection(id).catch(() =>
                                console.log("Error adding selection")
                            )
                        }
                    />
                </StyledDemo>
            </SearchContext.Provider>
        </StyledPageContainer>
    );
};

export default Demo;
