import LargeService from "./LargeService/LargeService";
import ServicesOutputLogic from "./ServiceOutput.logic";
import {
    StyledServiceOutput,
    StyledStateContainer,
} from "./ServiceOutput.styles";
import React from "react";
import ServicesList from "./ServicesList/ServicesList";
import { SyncLoader } from "react-spinners";
import PagesBar from "../../PagesBar/PagesBar";

interface Props {
    outputRef?: React.MutableRefObject<any> | undefined;
}

function ServiceOutput({ outputRef }: Props) {
    const {
        focus,
        setFocus,
        useOnServicesChange,
        useOnFocusOrPageChange,
        search,
        getServices,
    } = ServicesOutputLogic();
    useOnServicesChange(search.services, outputRef);
    useOnFocusOrPageChange(focus, search.page, outputRef);

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
            ) : (
                <>
                    <ServicesList
                        services={getServices(search.filter)}
                        setFocus={setFocus}
                        type="search"
                    />
                    {search.services.length > 0 && <PagesBar />}
                </>
            )}
        </StyledServiceOutput>
    );
}

export default ServiceOutput;
