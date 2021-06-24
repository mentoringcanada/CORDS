import { SyncLoader } from "react-spinners";
import SearchStateLogic from "./SearchState.logic";
import { StyledStateContainer } from "./SearchState.styles";

const SearchState = () => {
    const { search } = SearchStateLogic();

    return (
        <>
            {search.state && search.state !== "" && (
                <StyledStateContainer>
                    {search.state === "searching" && (
                        <SyncLoader color="#bbb" />
                    )}
                    {search.state === "no-results" && (
                        <h4>No results found in your area...</h4>
                    )}
                </StyledStateContainer>
            )}
        </>
    );
};

export default SearchState;
