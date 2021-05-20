import React from "react";
import { StyledCloseButton, StyledFrame } from "./Frame.styles";
import WidgetSearch from "../pages/WidgetSearch/WidgetSearch";

interface Props {
    setWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

// Body of Widget holding components
const Frame = ({ setWidget }: Props) => {
    return (
        <StyledFrame>
            <StyledCloseButton
                onClick={() => setWidget(false)}
                data-testid="close-button"
            >
                &minus;
            </StyledCloseButton>
            <WidgetSearch />
        </StyledFrame>
    );
};

export default Frame;
