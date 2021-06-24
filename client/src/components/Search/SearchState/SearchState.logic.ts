import { useContext } from "react";
import SearchContext from "../SearchContext";

const SearchStateLogic = () => {
    const { search } = useContext(SearchContext);

    return { search };
};

export default SearchStateLogic;
