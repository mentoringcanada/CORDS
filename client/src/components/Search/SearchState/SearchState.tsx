import { SyncLoader } from "react-spinners";
import SearchStateLogic from "./SearchState.logic";
import { StyledStateContainer } from "./SearchState.styles";

const SearchState = () => {
    const { search, error, searchStateContent } = SearchStateLogic();

    if (error) return <p>Content collection error...</p>;

    return (
        <>
            {search.state && search.state !== "" && (
                <StyledStateContainer>
                    {search.state === "searching" && (
                        <SyncLoader color="#bbb" />
                    )}
                    {search.state === "no-results" && (
                        <h4>{searchStateContent.noResultsState}</h4>
                    )}
                    {search.state === "error" && (
                        <h4>{searchStateContent.errorState}</h4>
                    )}
                </StyledStateContainer>
            )}
        </>
    );
};

export default SearchState;
