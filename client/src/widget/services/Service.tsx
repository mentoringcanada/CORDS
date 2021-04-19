// Import
import React from "react";
import styled from "styled-components";
import { FaLink, FaSave } from "react-icons/fa";
import { addSelection } from "../utils/api";

// Styling
const StyledService = styled.div`
    position: relative;
    border: 2px solid var(--primary-color);
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 0.3rem;
    cursor: pointer;
    box-shadow: 2px 2px 3px grey;
    transition: background-color 0.1s linear;
    :hover {
        background-color: #fbfbfb;
    }
    h3 {
        width: 75%;
    }
    /* Link button */
    a,
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.2rem;
        font-size: 1.2rem;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 2px solid var(--primary-color);
        background-color: transparent;
        transition: background-color 0.4s linear;
    }
    a:hover,
    button:hover {
        background-color: #eee;
    }
    svg {
        color: var(--primary-color);
    }
    .buttons {
        display: flex;
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
    }
    p {
        margin-top: 0.5rem;
        color: #4d5156;
        font-size: 0.8rem;
        line-height: 1.1rem;
    }
`;

// Props
interface Props {
    id: string;
    name: string;
    link: string;
    description: string;
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
}

// Component
const Service = ({ id, name, description, link, setFocus }: Props) => {
    const handleSelection = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(addSelection(id));
    };
    return (
        <StyledService
            onClick={() => {
                setFocus(null);
                setFocus(Number(id));
            }}
        >
            <h3>{name}</h3>
            <div className="buttons">
                <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FaLink />
                </a>
                <button onClick={handleSelection}>
                    <FaSave />
                </button>
            </div>
            <p>{description}</p>
        </StyledService>
    );
};

export default Service;
