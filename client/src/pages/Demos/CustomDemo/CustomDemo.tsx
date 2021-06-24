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
import ServiceOutput from "../../../components/Search/ServicesOutput/ServicesOutput";
import SearchContext from "../../../components/Search/SearchContext";
import SearchState from "../../../components/Search/SearchState/SearchState";

const CustomDemo = () => {
    const { useHandleDemoChange, handleGeoSearch, search, setSearch } =
        DemoLogic();
    const { error, customDemoContent } = CustomDemoLogic();
    useHandleDemoChange("");

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
                                    value={search.query}
                                    onChange={(e) =>
                                        setSearch({
                                            ...search,
                                            query: e.target.value,
                                        })
                                    }
                                />
                                <MdEdit />
                            </label>
                        </StyledCustomInputs>
                        <StyledViewSimilarButton
                            className="demo"
                            onClick={() => handleGeoSearch(1)}
                        >
                            {customDemoContent.buttonText}
                        </StyledViewSimilarButton>
                        <DemoInfo
                            explanation={customDemoContent.customExplanation}
                        />
                    </StyledContainer>
                    <SearchState />
                    <ServiceOutput handleServices={handleGeoSearch} />
                </StyledDemo>
            </SearchContext.Provider>
        </StyledPageContainer>
    );
};

export default CustomDemo;
