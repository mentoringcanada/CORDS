import { useContext } from "react";
import SearchContext from "../SearchContext";

const PagesBarLogic = () => {
    const { search, setSearch } = useContext(SearchContext);

    const mutatePage = (x: number) => {
        if (search.page + x > 0) {
            setSearch({
                ...search,
                page: search.page + x,
            });
        }
    };

    const setPage = (x: number) => {
        setSearch({
            ...search,
            page: x,
        });
    };

    return { search, mutatePage, setPage };
};

export default PagesBarLogic;
