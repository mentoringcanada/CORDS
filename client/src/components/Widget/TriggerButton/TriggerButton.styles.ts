import styled from "styled-components";

export const StyledTriggerButton = styled.button`
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    padding: 0.7rem 1.1rem;
    border-radius: 5rem;
    background-color: var(--primary-color);
    font-size: 1rem;
    @media only screen and (max-width: 768px) {
        right: 0.5rem;
        bottom: 0.5rem;
        font-size: 0.8rem;
    }
`;
