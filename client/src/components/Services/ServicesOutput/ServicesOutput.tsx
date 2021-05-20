import SmallService from "../SmallService/SmallService";
import { Location, Service } from "../../../types";
import LargeService from "../LargeService/LargeService";
import ServicesOutputLogic from "./ServiceOutput.logic";
import { StyledServiceOutput } from "./ServiceOutput.styles";
import { StyledStateContainer } from "./ServiceOutput.styles";
import { SyncLoader } from "react-spinners";
import React from "react";

interface Props {
    services: Service[];
    children?: React.ReactNode;
    searchState?: string;
    setSearchState?: React.Dispatch<React.SetStateAction<string>>;
    location?: Location;
}

function ServiceOutput({
    services,
    children,
    searchState,
    setSearchState,
    location = { lat: undefined, lng: undefined },
}: Props) {
    const {
        outputRef,
        focus,
        setFocus,
        useOnServicesChange,
        useOnFocusChange,
    } = ServicesOutputLogic();
    useOnServicesChange(services);
    useOnFocusChange(focus);

    return (
        <StyledServiceOutput ref={outputRef} data-testid="output-container">
            {searchState && searchState !== "" && (
                <StyledStateContainer>
                    {searchState === "searching" && <SyncLoader color="#bbb" />}
                    {searchState === "no-results" && (
                        <h4>No results found in your area...</h4>
                    )}
                </StyledStateContainer>
            )}
            {focus ? (
                <LargeService
                    id={focus}
                    setFocus={setFocus}
                    location={location}
                    setSearchState={setSearchState}
                    data-testid="large-service"
                />
            ) : (
                services &&
                services.map((service) => (
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
            {children}
        </StyledServiceOutput>
    );
}

export default ServiceOutput;
