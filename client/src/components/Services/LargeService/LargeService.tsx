// Imports
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { StyledLargeService } from "./LargeService.styles";
import ServiceList from "../ServiceList/ServiceList";
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
                        <button className="info" onClick={() => setFocus(null)}>
                            <FaAngleLeft />
                        </button>
                        <h2 className="info">{service.name}</h2>
                        <p className="info">
                            <strong>Address:</strong> {service.address}
                        </p>
                        <p className="info">{service.description}</p>
                        <a
                            href={service.link}
                            target="_blank"
                            rel="noreferrer"
                            className="link"
                        >
                            <FaLink />
                            Visit Website
                        </a>
                    </StyledContainer>
                    <div className="similar">
                        <h3>Similar</h3>
                    </div>
                    <ServiceList services={similar} setFocus={setFocus} />
                </>
            )}
        </StyledLargeService>
    );
};

export default LargeService;
