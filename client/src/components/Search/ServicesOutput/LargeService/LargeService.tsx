// Imports
import React from "react";
import { FaAngleLeft, FaMapMarkerAlt } from "react-icons/fa";
import {
    StyledBackButton,
    StyledInfo,
    StyledLargeService,
    StyledLinks,
} from "./LargeService.styles";
import LargeServiceLogic from "./LargeService.logic";
import { StyledContainer } from "../../../../styles/StyledContainer";
import { FaLink } from "react-icons/fa";
import { StyledDescription } from "../SmallService/SmallService.styles";
import ServicesList from "../ServicesList/ServicesList";
import { getDescription, getName } from "../../../../helper/Services";

interface Props {
    id: number;
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
}

// Component
const LargeService = ({ id, setFocus }: Props) => {
    const {
        language,
        similar,
        service,
        useSetState,
        largeServiceContent,
        error,
        handleSimilar,
        page,
        setPage,
    } = LargeServiceLogic(id);
    useSetState(id);

    if (error) return <p>Content collection error...</p>;

    return (
        <>
            {service && (
                <>
                    <StyledLargeService>
                        <StyledContainer className="widget">
                            <StyledBackButton
                                className="info"
                                onClick={() => setFocus(null)}
                                data-testid="back-button"
                            >
                                <FaAngleLeft />
                            </StyledBackButton>
                            <StyledInfo>
                                <h2 className="info" data-testid="large-title">
                                    {getName(service, language)}
                                </h2>
                                {service.address !== "" && (
                                    <p>
                                        <strong>
                                            {largeServiceContent.address}{" "}
                                        </strong>
                                        {service.address}
                                    </p>
                                )}
                                {service.distance && (
                                    <p>
                                        <strong>
                                            {largeServiceContent.distance}{" "}
                                        </strong>
                                        {`${service.distance.toFixed(1)} km`}
                                    </p>
                                )}
                                {service.phone !== "" && (
                                    <p>
                                        <strong>
                                            {largeServiceContent.phone}{" "}
                                        </strong>
                                        {service.phone}
                                    </p>
                                )}
                            </StyledInfo>
                            <StyledDescription
                                className="info-desc"
                                dangerouslySetInnerHTML={{
                                    __html: getDescription(service, language),
                                }}
                            ></StyledDescription>
                            <StyledLinks>
                                <a
                                    href={service.link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaLink />
                                    {largeServiceContent.viewMore}
                                </a>
                                <a
                                    href={`https://www.google.com/maps/place/${service.lat},${service.lng}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaMapMarkerAlt />
                                    {largeServiceContent.directions}
                                </a>
                            </StyledLinks>
                        </StyledContainer>
                        <div className="similar">
                            <h3>{largeServiceContent.similar}</h3>
                        </div>
                    </StyledLargeService>
                    <ServicesList
                        setFocus={setFocus}
                        services={similar}
                        type={"similar"}
                        handleServices={handleSimilar}
                        page={page}
                        setPage={setPage}
                    />
                </>
            )}
        </>
    );
};

export default LargeService;
