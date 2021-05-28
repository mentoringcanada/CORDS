import React from "react";
import TriggerButtonLogic from "./TriggerButton.logic";
import { StyledTriggerButton } from "./TriggerButton.styles";

interface Props {
    setWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

const TriggerButton = ({ setWidget }: Props) => {
    const { error, widgetContent } = TriggerButtonLogic();

    if (error) {
        return <p>Content collection error...</p>;
    }

    return (
        <StyledTriggerButton onClick={() => setWidget(true)}>
            {widgetContent.triggerButtonText}
        </StyledTriggerButton>
    );
};

export default TriggerButton;
