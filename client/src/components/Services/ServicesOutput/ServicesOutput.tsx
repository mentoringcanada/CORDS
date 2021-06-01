import { SearchResults } from "../../../types";
import LargeService from "../LargeService/LargeService";
import ServicesOutputLogic from "./ServiceOutput.logic";
import { StyledServiceOutput } from "./ServiceOutput.styles";
import React from "react";
import SearchFeedback from "./SearchFeedback";
import ServicesList from "../ServicesList/ServicesList";
import ServicesFilter from "../ServicesFilter/ServicesFilter";

interface Props {
    serviceResults: SearchResults;
    outputRef?: React.MutableRefObject<any> | undefined;
    searchState?: string;
    setSearchState?: React.Dispatch<React.SetStateAction<string>>;
}

function ServiceOutput({
    serviceResults,
    outputRef,
    searchState,
    setSearchState,
}: Props) {
    const {
        focus,
        setFocus,
        useOnServicesChange,
        useOnFocusChange,
        filterOption,
        handleFilterOption,
    } = ServicesOutputLogic();
    useOnServicesChange(serviceResults.services, outputRef);
    useOnFocusChange(focus, outputRef);

    return (
        <StyledServiceOutput data-testid="output-container">
            {!focus && setSearchState && (
                <ServicesFilter handleFilterOption={handleFilterOption} />
            )}
            {searchState && searchState !== "" && (
                <SearchFeedback searchState={searchState} />
            )}
            {focus ? (
                <LargeService
                    id={focus}
                    setFocus={setFocus}
                    location={serviceResults.location}
                    setSearchState={setSearchState}
                    data-testid="large-service"
                />
            ) : filterOption === "proximity" ? (
                <ServicesList
                    services={serviceResults.services
                        .concat()
                        .sort((a, b) => a.distance - b.distance)}
                    setFocus={setFocus}
                />
            ) : (
                <ServicesList
                    services={serviceResults.services}
                    setFocus={setFocus}
                />
            )}
        </StyledServiceOutput>
    );
}

export default ServiceOutput;
