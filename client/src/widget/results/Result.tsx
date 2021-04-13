// Import
import React from "react";
import styled from "styled-components";
import { FaLink } from "react-icons/fa";

// Styling
const StyledResult = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
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
    a {
        justify-self: flex-end;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 2px solid var(--primary-color);
        background-color: transparent;
        transition: background-color 0.4s linear;
    }
    a:hover {
        background-color: #eee;
    }
    svg {
        color: var(--primary-color);
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
    description: string;
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
}

// Component
const Result = ({ id, name, description, setFocus }: Props) => {
    return (
        <StyledResult onClick={() => setFocus(Number(id))}>
            <h3>{name}</h3>
            <a
                href={"https://211ontario.ca/"}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
            >
                <FaLink />
            </a>
            <p>{description}</p>
        </StyledResult>
    );
};

export default Result;
