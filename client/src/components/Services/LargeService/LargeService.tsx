// Imports
import React from "react";
import { FaAngleLeft, FaMapMarkerAlt } from "react-icons/fa";
import {
    StyledBackButton,
    StyledLargeService,
    StyledLinks,
} from "./LargeService.styles";
import ServicesOutput from "../ServicesOutput/ServicesOutput";
import LargeServiceLogic from "./LargeService.logic";
import { StyledContainer } from "../../../styles/StyledContainer";
import { FaLink } from "react-icons/fa";

interface Props {
    id: number;
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
}

// Component
const LargeService = ({ id, setFocus }: Props) => {
    const { similar, service, useSetState } = LargeServiceLogic();
    useSetState(id);

    return (
        <StyledLargeService>
            {service && (
                <>
                    <StyledContainer className="widget">
                        <StyledBackButton
                            className="info"
                            onClick={() => setFocus(null)}
                            data-testid="back-button"
                        >
                            <FaAngleLeft />
                        </StyledBackButton>
                        <h2 className="info">{service.name}</h2>
                        <p className="info">
                            <strong>Address:</strong> {service.address}
                        </p>
                        {service.distance && (
                            <p className="info">
                                <strong>Distance:</strong>{" "}
                                {service.distance.toFixed(1)}
                            </p>
                        )}
                        <p className="info">{service.description}</p>
                        <StyledLinks>
                            <a
                                href={service.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaLink />
                                View More
                            </a>
                            <a
                                href={`https://www.google.com/maps/place/${service.lat},${service.lng}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaMapMarkerAlt />
                                Directions
                            </a>
                        </StyledLinks>
                    </StyledContainer>
                    <div className="similar">
                        <h3>Similar</h3>
                    </div>
                    <ServicesOutput services={similar} />
                </>
            )}
        </StyledLargeService>
    );
};

export default LargeService;
