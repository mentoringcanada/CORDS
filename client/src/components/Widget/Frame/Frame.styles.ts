// Imports
import styled from "styled-components";

export const StyledFrame = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    padding: 0.8rem 0.5rem 0.5rem 0.5rem;
    width: 350px;
    height: 500px;
    border-radius: 10px;
    background-color: var(--primary-color);
    box-shadow: 2px 2px 5px grey;

    @media only screen and (max-width: 375px) {
        width: 90%;
        bottom: 0.5rem;
        right: 0.5rem;
    }
`;

export const StyledCloseButton = styled.button`
    font-size: 0.8rem;
    position: absolute;
    width: 1rem;
    height: 1rem;
    top: 0.15rem;
    right: 0.25rem;
    background-color: transparent;
`;
