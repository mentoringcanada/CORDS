import Select from "react-select";
import { StyledDistanceSelect } from "./DistanceSelect.styles";
import DistanceSelectLogic from "./DistanceSelect.logic";
import { SelectStyles } from "../LocationBar.styles";

const DistanceInput = () => {
    const { handleDistanceChange, distanceSelectOptions } =
        DistanceSelectLogic();

    return (
        <StyledDistanceSelect>
            <Select
                options={distanceSelectOptions}
                styles={SelectStyles(false)}
                onChange={handleDistanceChange}
                placeholder="Within..."
                inputId="select-distance"
                isSearchable
            />
        </StyledDistanceSelect>
    );
};

export default DistanceInput;
