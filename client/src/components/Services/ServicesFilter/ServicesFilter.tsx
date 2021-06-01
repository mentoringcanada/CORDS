import React from "react";
import Select from "react-select";
import ServicesFilterLogic from "./ServicesFilter.logic";
import { FilterStyles, StyledServicesFilter } from "./ServicesFilter.styles";

interface Props {
    handleFilterOption: (filter: any) => void;
}

const ServicesFilter = ({ handleFilterOption }: Props) => {
    const { filterOptions } = ServicesFilterLogic();

    return (
        <StyledServicesFilter>
            <Select
                defaultValue={{ label: "Best Match", value: "best" }}
                options={filterOptions}
                styles={FilterStyles()}
                onChange={handleFilterOption}
            />
        </StyledServicesFilter>
    );
};

export default ServicesFilter;
