import Select from "react-select";
import { StyledDistanceSelect } from "./DistanceSelect.styles";
import DistanceSelectLogic from "./DistanceSelect.logic";
import { SelectStyles } from "../LocationBar.styles";

const DistanceSelect = () => {
    const { handleDistanceChange, distanceSelectOptions } =
        DistanceSelectLogic();

    return (
        <StyledDistanceSelect data-testID="distance-select">
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

export default DistanceSelect;
