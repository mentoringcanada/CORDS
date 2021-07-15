import { MdEdit } from "react-icons/md";
import DemoLogic from "../Demo.logic";
import CustomDemoLogic from "./CustomDemo.logic";
import {
    StyledCustomInputs,
    StyledDemo,
    StyledViewSimilarButton,
} from "../Demo.styles";
import { StyledPageContainer } from "../../../styles/StyledPageContainer";
import { StyledContainer } from "../../../styles/StyledContainer";
import DemoInfo from "../DemoInfo/DemoInfo";
import ServicesList from "../../../components/ServicesOutput/ServicesList/ServicesList";
import { useHistory } from "react-router-dom";
import SearchContext from "../../Search/SearchContext";
import SearchState from "../../Search/SearchState/SearchState";
import { addSelection } from "../../../helper/API";

const CustomDemo = () => {
    const {
        useHandleDemoChange,
        handleDemo,
        search,
        setSearch,
        services,
        maxPages,
        useOnPageChange,
        page,
        useSetState,
    } = DemoLogic("");
    const {
        language,
        error,
        customDemoContent,
        titleValue,
        setTitleValue,
        useSetCustomState,
        queryValue,
        setQueryValue,
    } = CustomDemoLogic();
    useSetState();
    useSetCustomState();
    useOnPageChange(page);
    useHandleDemoChange("");
    const history = useHistory();

    if (error) {
        return <p>Content collection error...</p>;
    }

    return (
        <StyledPageContainer>
            <SearchContext.Provider value={{ search, setSearch }}>
                <StyledDemo>
                    <StyledContainer>
                        <StyledCustomInputs>
                            <h2>{customDemoContent.customTitle}</h2>
                            <label className="title">
                                <input
                                    value={titleValue}
                                    onChange={(e) =>
                                        setTitleValue(e.target.value)
                                    }
                                    type="text"
                                    placeholder={
                                        customDemoContent.customNamePlaceholder
                                    }
                                />
                                <MdEdit />
                            </label>
                            <label className="desc">
                                <input
                                    type="text"
                                    placeholder={
                                        customDemoContent.customDescriptionPlaceholder
                                    }
                                    value={queryValue}
                                    onChange={(e) => {
                                        setQueryValue(e.target.value);
                                        setSearch({
                                            ...search,
                                            query: e.target.value,
                                        });
                                    }}
                                />
                                <MdEdit />
                            </label>
                        </StyledCustomInputs>
                        <StyledViewSimilarButton
                            className="demo"
                            onClick={() => {
                                history.push({
                                    pathname: history.location.pathname,
                                    search: `?ln=${language}&query=${queryValue}&title=${titleValue}&page=1`,
                                });
                                handleDemo();
                            }}
                        >
                            {customDemoContent.buttonText}
                        </StyledViewSimilarButton>
                        <DemoInfo
                            explanation={customDemoContent.customExplanation}
                        />
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

export default CustomDemo;
