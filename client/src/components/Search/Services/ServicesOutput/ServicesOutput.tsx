import LargeService from "./LargeService/LargeService";
import ServicesOutputLogic from "./ServiceOutput.logic";
import {
    StyledServiceOutput,
    StyledStateContainer,
} from "./ServiceOutput.styles";
import React from "react";
import ServicesList from "./ServicesList/ServicesList";
import { SyncLoader } from "react-spinners";
import { useContext } from "react";
import SearchContext from "../../SearchContext";

interface Props {
    outputRef?: React.MutableRefObject<any> | undefined;
}

function ServiceOutput({ outputRef }: Props) {
    const { search } = useContext(SearchContext);

    const { focus, setFocus, useOnServicesChange, useOnFocusChange } =
        ServicesOutputLogic();
    useOnServicesChange(search.services, outputRef);
    useOnFocusChange(focus, outputRef);

    return (
        <StyledServiceOutput data-testid="output-container">
            {search.state && search.state !== "" && (
                <StyledStateContainer>
                    {search.state === "searching" && (
                        <SyncLoader color="#bbb" />
                    )}
                    {search.state === "no-results" && (
                        <h4>No results found in your area...</h4>
                    )}
                </StyledStateContainer>
            )}
            {focus ? (
                <LargeService
                    id={focus}
                    setFocus={setFocus}
                    location={search.location}
                    data-testid="large-service"
                />
            ) : search.filter === "proximity" ? (
                <ServicesList
                    services={search.services
                        .concat()
                        .sort((a: any, b: any) => a.distance - b.distance)}
                    setFocus={setFocus}
                    type="search"
                />
            ) : (
                <ServicesList
                    services={search.services}
                    setFocus={setFocus}
                    type="search"
                />
            )}
        </StyledServiceOutput>
    );
}

export default ServiceOutput;
