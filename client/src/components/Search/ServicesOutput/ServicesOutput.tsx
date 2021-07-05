import LargeService from "./LargeService/LargeService";
import ServicesOutputLogic from "./ServiceOutput.logic";
import { StyledServiceOutput } from "./ServiceOutput.styles";
import React from "react";
import ServicesList from "./ServicesList/ServicesList";

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
            {focus && search.state !== "error" ? (
                <LargeService
                    id={focus}
                    setFocus={setFocus}
                    data-testid="large-service"
                />
            ) : (
                <ServicesList
                    services={getServices(search.filter)}
                    setFocus={setFocus}
                    type="search"
                    handleServices={handleServices}
                    page={page}
                    setPage={setPage}
                    outputRef={outputRef}
                />
            )}
        </StyledServiceOutput>
    );
}

export default ServiceOutput;
