import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../../../helper/LanguageContext";
import SearchContext from "../../../pages/Search/SearchContext";
import { StyledContainer } from "../../../styles/StyledContainer";

interface Props {
    suggestedSearches: string[];
}

const RecommendBox = ({ suggestedSearches }: Props) => {
    const { search } = useContext(SearchContext);
    const { language } = useContext(LanguageContext);
    return (
        <>
            {suggestedSearches.length > 0 && (
                <StyledContainer>
                    <h3 style={{ marginBottom: "0.5rem" }}>
                        Suggested for you based on:
                    </h3>
                    {suggestedSearches.map((suggestion) => (
                        <Link
                            to={`/search/results?ln=${language}&query=${suggestion}&distance=${search.distance}&lat=${search.location.lat}&lng=${search.location.lng}&filter=${search.filter}&source=${search.dataSource}&page=1`}
                            style={{ textDecoration: "none", color: "#333" }}
                        >
                            <p>{suggestion}</p>
                        </Link>
                    ))}
                </StyledContainer>
            )}
        </>
    );
};

export default RecommendBox;
