import { SyncLoader } from "react-spinners";
import { StyledStateContainer } from "./ServiceOutput.styles";

interface Props {
    searchState: string;
}

const SearchFeedback = ({ searchState }: Props) => {
    return (
        <StyledStateContainer>
            {searchState === "searching" && <SyncLoader color="#bbb" />}
            {searchState === "no-results" && (
                <h4>No results found in your area...</h4>
            )}
        </StyledStateContainer>
    );
};

export default SearchFeedback;
