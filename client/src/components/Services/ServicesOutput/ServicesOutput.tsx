import SmallService from "../SmallService/SmallService";
import { SearchResults } from "../../../types";
import LargeService from "../LargeService/LargeService";
import ServicesOutputLogic from "./ServiceOutput.logic";
import { StyledServiceOutput } from "./ServiceOutput.styles";
import React from "react";
import SearchFeedback from "./SearchFeedback";

interface Props {
    serviceResults: SearchResults;
    searchState?: string;
    setSearchState?: React.Dispatch<React.SetStateAction<string>>;
}

function ServiceOutput({ serviceResults, searchState, setSearchState }: Props) {
    const {
        outputRef,
        focus,
        setFocus,
        useOnServicesChange,
        useOnFocusChange,
    } = ServicesOutputLogic();
    useOnServicesChange(serviceResults.services);
    useOnFocusChange(focus);

    return (
        <StyledServiceOutput ref={outputRef} data-testid="output-container">
            {searchState && searchState !== "" && (
                <SearchFeedback searchState={searchState} />
            )}{" "}
            {focus ? (
                <LargeService
                    id={focus}
                    setFocus={setFocus}
                    location={serviceResults.location}
                    setSearchState={setSearchState}
                    data-testid="large-service"
                />
            ) : (
                serviceResults.services.map((service) => (
                    <SmallService
                        key={service.item_id}
                        id={service.item_id}
                        name={service.name}
                        link={service.link}
                        description={service.description}
                        setFocus={setFocus}
                        data-testid="small-service"
                    />
                ))
            )}
        </StyledServiceOutput>
    );
}

export default ServiceOutput;
