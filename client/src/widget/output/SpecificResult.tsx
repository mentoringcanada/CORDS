// Imports
// import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineRollback } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";

// Styling
const StyledSpecificResult = styled.div`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    p,
    h2,
    h3 {
        margin-top: 0.4rem;
    }
    h2 {
        margin-bottom: 0.3rem;
    }
    p {
        font-size: 0.8rem;
        line-height: 1.1rem;
        color: #4d5156;
    }
    button {
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
    id: number | null;
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
}

// Component
const SpecificResult = ({ id, setFocus }: Props) => {
    const [service, setService] = useState<LongService | null>(null);

    useEffect(() => {
        // Gets service data on component startup
        const getServiceData = async () => {
            // const res = await axios.get(`/result/${id}`);
            // const data = await res.data;
            let data = {
                service: {
                    id: 1,
                    name: "Daily Bread",
                    link: "https://www.dailybread.ca/",
                    description:
                        "Daily Bread’s dedicated staff, volunteers, member agencies, and Board of Directors work together to end hunger in our communities, and change the way people think about poverty.",
                    location: "191 New Toronto St, Etobicoke, ON M8V 2E7",
                    distance: "8.4km",
                },
            };
            setService(data.service);
        };
        getServiceData();
    }, [id]);

    return (
        <StyledSpecificResult>
            {service && (
                <>
                    <button onClick={() => setFocus(null)}>
                        <AiOutlineRollback />
                    </button>
                    <h2>{service.name}</h2>
                    <p>
                        <strong>Address:</strong> {service.location}
                    </p>
                    <p>
                        <strong>Distance:</strong> {service.distance}
                    </p>
                    <p>{service.description}</p>
                    <div className="link">
                        <BiWorld />
                        <a href={service.link} target="_blank" rel="noreferrer">
                            {service.link}
                        </a>
                    </div>
                </>
            )}
        </StyledSpecificResult>
    );
};

export default SpecificResult;
