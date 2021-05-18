// Imports
import React from "react";
import { FaAngleLeft, FaMapMarkerAlt } from "react-icons/fa";
import {
    StyledBackButton,
    StyledLargeService,
    StyledLinks,
} from "./LargeService.styles";
import LargeServiceLogic from "./LargeService.logic";
import { StyledContainer } from "../../../styles/StyledContainer";
import { FaLink } from "react-icons/fa";
import SmallService from "../SmallService/SmallService";
import { Location } from "../../../types";
import { StyledDescription } from "../SmallService/SmallService.styles";

interface Props {
    id: number;
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
    location: Location;
}

// Component
const LargeService = ({ id, setFocus, location }: Props) => {
    const { similar, service, useSetState } = LargeServiceLogic(location);
    useSetState(id);

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
                            <h2 className="info" data-testid="large-title">
                                {service.name}
                            </h2>
                            <p className="info">
                                <strong>Address:</strong> {service.address}
                            </p>
                            {service.distance && (
                                <p className="info">
                                    <strong>Distance:</strong>{" "}
                                    {service.distance.toFixed(1)}
                                </p>
                            )}
                            <StyledDescription
                                className="info-desc"
                                dangerouslySetInnerHTML={{
                                    __html: service.description,
                                }}
                            ></StyledDescription>
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
                    </StyledLargeService>
                    <>
                        {similar &&
                            similar.map((service) => (
                                <SmallService
                                    key={service.item_id}
                                    id={service.item_id}
                                    name={service.name}
                                    link={service.link}
                                    description={service.description}
                                    setFocus={setFocus}
                                    data-testid="small-service"
                                />
                            ))}
                    </>
                </>
            )}
        </>
    );
};

export default LargeService;
