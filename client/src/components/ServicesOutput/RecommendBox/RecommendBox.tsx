import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LanguageContext from "../../../helper/LanguageContext";
import SearchContext from "../../../pages/Search/SearchContext";
import { StyledContainer } from "../../../styles/StyledContainer";

interface Props {
    suggestedSearches: string[];
}

const RecommendBox = ({ suggestedSearches }: Props) => {
    const { search, setSearch } = useContext(SearchContext);
    const { language } = useContext(LanguageContext);
    const history = useHistory();

    const StyledSuggestion = styled.a`
        color: #333;
        cursor: pointer;
        :hover {
            text-decoration: underline;
        }
    `;

    const handleSuggestionSearch = (suggestion: string) => {
        history.push(
            `/search/results?ln=${language}&query=${suggestion}&distance=${search.distance}&lat=${search.location.lat}&lng=${search.location.lng}&filter=${search.filter}&source=${search.dataSource}&page=1`
        );
        setSearch({
            ...search,
            query: suggestion,
        });
    };

    return (
        <>
            {suggestedSearches.length > 0 && (
                <StyledContainer>
                    <h3 style={{ marginBottom: "0.5rem" }}>
                        Suggested searches for you:
                    </h3>
                    {suggestedSearches.map((suggestion) => (
                        <StyledSuggestion
                            onClick={() => handleSuggestionSearch(suggestion)}
                        >
                            {suggestion}
                        </StyledSuggestion>
                    ))}
                </StyledContainer>
            )}
        </>
    );
};

export default RecommendBox;
