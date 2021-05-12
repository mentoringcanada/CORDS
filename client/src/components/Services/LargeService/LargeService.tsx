// Imports
import React, { useEffect, useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { StyledLargeService } from "./LargeService.styles";
import { Service } from "../../../types";
import { getSimilar } from "../../../helper/api";
import ServiceList from "../ServiceList/ServiceList";

// Props
interface Props {
    id: number;
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
}

// Component
const LargeService = ({ id, setFocus }: Props) => {
    const [similar, setSimilar] = useState<Service[]>([]);
    const [service, setService] = useState<Service | null>(null);

    useEffect(() => {
        // Gets service data on component startup
        getSimilar(id).then((res) => {
            setService(res[0]);
            setSimilar(res.slice(1));
        });
    }, [id]);

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
                    <ServiceList services={similar} setFocus={setFocus} />
                </>
            )}
        </StyledLargeService>
    );
};

export default LargeService;
