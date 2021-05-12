import React from "react";
import { StyledTriggerButton } from "./TriggerButton.styles";

interface Props {
    setWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

const TriggerButton = ({ setWidget }: Props) => {
    return (
        <StyledTriggerButton onClick={() => setWidget(true)}>
            Find Resources
        </StyledTriggerButton>
    );
};

export default TriggerButton;
