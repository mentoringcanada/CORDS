// Imports
import React from "react";
import styled from "styled-components";

// Styling
const StyledTriggerButton = styled.button`
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

// Props
interface Props {
    setWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component
const TriggerButton = ({ setWidget }: Props) => {
    return (
        <StyledTriggerButton onClick={() => setWidget(true)}>
            Find Resources
        </StyledTriggerButton>
    );
};

export default TriggerButton;
