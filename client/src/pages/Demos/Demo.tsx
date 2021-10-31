import DemoLogic from "./Demo.logic";
import {
    StyledCustomInputs,
    StyledDefaultInfo,
    StyledDemo,
    StyledViewSimilarButton,
} from "./Demo.styles";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import { StyledContainer } from "../../styles/StyledContainer";
import DemoInfo from "./DemoInfo/DemoInfo";
import ServicesList from "../../components/ServicesOutput/ServicesList/ServicesList";
import { Route, Switch, useHistory } from "react-router-dom";
import SearchContext from "../Search/SearchContext";
import SearchState from "../Search/SearchState/SearchState";
import { MdEdit } from "react-icons/md";

interface Props {
    description?: string;
    title?: string;
}

const Demo = ({ description, title }: Props) => {
    const {
        useHandleDemoChange,
        error,
        demoContent,
        search,
        setSearch,
        services,
        maxPages,
        useSetState,
        page,
        language,
        titleValue,
        setTitleValue,
        queryValue,
        setQueryValue,
        query,
        name,
    } = DemoLogic();
    useHandleDemoChange(description);
    useSetState(page, query, name);
    const history = useHistory();

    if (error) {
        return <p>Content collection error...</p>;
    }

    return (
        <StyledPageContainer>
            <SearchContext.Provider value={{ search, setSearch }}>
                <StyledDemo>
                    <StyledContainer>
                        <Switch>
                            <Route path="/demo/custom" exact>
                                <StyledCustomInputs
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        history.push({
                                            pathname: history.location.pathname,
                                            search: `?ln=${language}&query=${queryValue}&title=${titleValue}&page=1`,
                                        });
                                    }}
                                >
                                    <h2>{demoContent.customTitle}</h2>
                                    <label className="title">
                                        <input
                                            value={titleValue}
                                            onChange={(e) =>
                                                setTitleValue(e.target.value)
                                            }
                                            type="text"
                                            placeholder={
                                                demoContent.customNamePlaceholder
                                            }
                                        />
                                        <MdEdit />
                                    </label>
                                    <label className="desc">
                                        <input
                                            type="text"
                                            placeholder={
                                                demoContent.customDescriptionPlaceholder
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
                                    <StyledViewSimilarButton
                                        className="demo"
                                        type="submit"
                                    >
                                        {demoContent.buttonText}
                                    </StyledViewSimilarButton>
                                </StyledCustomInputs>
                                <DemoInfo
                                    explanation={demoContent.customExplanation}
                                />
                            </Route>
                            <Route path="/demo">
                                <StyledDefaultInfo>
                                    <h2>{title}</h2>
                                    <p>{description}</p>
                                    <StyledViewSimilarButton
                                        onClick={() => {
                                            history.push({
                                                pathname:
                                                    history.location.pathname,
                                                search: `?ln=${language}&query=${description}&title=${title}&page=1`,
                                            });
                                        }}
                                        className="demo"
                                    >
                                        {demoContent.buttonText}
                                    </StyledViewSimilarButton>
                                </StyledDefaultInfo>
                                <DemoInfo
                                    explanation={demoContent.explanation}
                                />
                            </Route>
                        </Switch>
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
