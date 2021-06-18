import LargeService from "./LargeService/LargeService";
import ServicesOutputLogic from "./ServiceOutput.logic";
import {
    StyledServiceOutput,
    StyledStateContainer,
} from "./ServiceOutput.styles";
import React from "react";
import ServicesList from "./ServicesList/ServicesList";
import { SyncLoader } from "react-spinners";

interface Props {
    outputRef?: React.MutableRefObject<any> | undefined;
    handleServices: (page: number) => void;
}

function ServiceOutput({ outputRef, handleServices }: Props) {
    const {
        focus,
        setFocus,
        useOnServicesChange,
        useOnFocusChange,
        search,
        getServices,
        page,
        setPage,
    } = ServicesOutputLogic();
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
                    data-testid="large-service"
                />
            ) : (
                <>
                    <ServicesList
                        services={getServices(search.filter)}
                        setFocus={setFocus}
                        type="search"
                        handleServices={handleServices}
                        page={page}
                        setPage={setPage}
                    />
                </>
            )}
        </StyledServiceOutput>
    );
}

export default ServiceOutput;
