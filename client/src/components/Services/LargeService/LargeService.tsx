// Imports
import React from "react";
import { AiOutlineRollback } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { StyledLargeService } from "./LargeService.styles";
import ServiceList from "../ServiceList/ServiceList";
import LargeServiceLogic from "./LargeService.logic";

// Props
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
                    <button className="info" onClick={() => setFocus(null)}>
                        <AiOutlineRollback />
                    </button>
                    <h2 className="info">{service.name}</h2>
                    <p className="info">
                        <strong>Address:</strong> {service.address}
                    </p>
                    <p className="info">{service.description}</p>
                    <div className="link">
                        <BiWorld />
                        <a href={service.link} target="_blank" rel="noreferrer">
                            {service.link}
                        </a>
                    </div>
                    <div className="similar">
                        <h3>Simlar</h3>
                    </div>
                    <ServiceList services={similar} setFocus={setFocus} />
                </>
            )}
        </StyledLargeService>
    );
};

export default LargeService;
