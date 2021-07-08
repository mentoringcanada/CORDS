import { useContext } from "react";
import { serviceRes } from "../../../helper/testData";
import SearchContext from "../../Search/SearchContext";

const SelectionsButtonLogic = () => {
    const { search, setSearch } = useContext(SearchContext);

    const handleAddSelection = () => {
        // TODO - add route, addSelection(id)
        const newSelections = search.selections.concat([
            serviceRes.data.items[0],
        ]);
        setSearch({
            ...search,
            selections: newSelections,
        });
    };

    const handleRemoveSelection = () => {
        // TODO - add route removeSelection(id)
        const newSelections = search.selections
            .concat()
            .slice(0, search.selections.length - 1);
        setSearch({
            ...search,
            selections: newSelections,
        });
    };

    return { handleAddSelection, handleRemoveSelection, search };
};

export default SelectionsButtonLogic;
