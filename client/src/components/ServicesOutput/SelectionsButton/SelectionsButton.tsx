import { FaMinus, FaRegSave } from "react-icons/fa";
import SelectionsButtonLogic from "./SelectionsButton.logic";
import { StyledSelectionsButton } from "./SelectionsButton.styles";

const SelectionsButton = () => {
    const { handleAddSelection, handleRemoveSelection, search } =
        SelectionsButtonLogic();
    return (
        <StyledSelectionsButton
            onClick={(e) => {
                e.stopPropagation();
                search.state === "selections"
                    ? handleRemoveSelection()
                    : handleAddSelection();
            }}
            data-testid="small-link"
        >
            {search.state === "selections" ? <FaMinus /> : <FaRegSave />}
        </StyledSelectionsButton>
    );
};

export default SelectionsButton;
