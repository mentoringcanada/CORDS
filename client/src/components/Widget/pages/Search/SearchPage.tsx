import { useRef } from "react";
import Search from "../../../Search/Search";
import { StyledSearch } from "./SearchPage.styles";

const SearchPage = () => {
    const searchRef = useRef(null);

    return (
        <StyledSearch ref={searchRef}>
            <Search outputRef={searchRef} />
        </StyledSearch>
    );
};

export default SearchPage;
