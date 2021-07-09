import styled from "styled-components";

export const StyledTriggerButton = styled.button`
    position: fixed;
    bottom: 0.8rem;
    right: 0.8rem;
    padding: 0.6rem 1.1rem;
    border-radius: 5rem;
    background-color: var(--primary-color);
    font-size: 0.95rem;
    @media only screen and (max-width: 768px) {
        right: 0.5rem;
        bottom: 0.5rem;
        font-size: 0.8rem;
    }
`;
