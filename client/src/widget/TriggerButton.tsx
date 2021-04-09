// Imports
import React from "react";
import styled from "styled-components";

// Styling
const StyledTriggerButton = styled.button`
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    height: 2.5rem;
    width: 9rem;
    border-radius: 5rem;
    background-color: var(--primary-color);
    font-size: 1rem;
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
