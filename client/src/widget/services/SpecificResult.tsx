// Imports
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineRollback } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";

// Utils
import { getSimilar } from "../utils/api";
import Similar from "./Similar";

// Styling
const StyledSpecificResult = styled.div`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    p.info,
    h2.info,
    h3.info {
        margin-top: 0.4rem;
    }
    h2.info {
        margin: 0rem 1.2rem 0.3rem 0rem;
        font-size: 1.2rem;
    }
    p.info {
        font-size: 0.8rem;
        line-height: 1.1rem;
        color: #4d5156;
    }
    button.info {
        background-color: transparent;
        color: black;
        font-size: 1.5rem;
        position: absolute;
        top: 0.3rem;
        right: 0.3rem;
    }
    .link {
        display: flex;
        align-items: center;
        svg {
            color: #4d5156;
            margin: 0.5rem 0;
            font-size: 1.4rem;
        }
        a {
            margin-left: 0.5rem;
            font-family: var(--secondary-font), Arial, Helvetica, sans-serif;
            font-size: 0.85rem;
            color: #1a73e8;
        }
    }
`;

// Props
interface Props {
    id: number;
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
}

// Component
const SpecificResult = ({ id, setFocus }: Props) => {
    // Similar Results
    const [similar, setSimilar] = useState<Service[]>([]);
    // Specific Service
    const [service, setService] = useState<Service | null>(null);

    useEffect(() => {
        // Gets service data on component startup
        getSimilar(id).then((res) => {
            setService(res[0]);
            setSimilar(res.slice(1));
        });
    }, [id]);

    return (
        <StyledSpecificResult>
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
                    <Similar similar={similar} setFocus={setFocus} />
                </>
            )}
        </StyledSpecificResult>
    );
};

export default SpecificResult;
