import React from "react";
import { StyledOutputContainer } from "./OutputContainer.styles";
import OutputContainerLogic from "./OutputContainer.logic";

interface Props {
    children: React.ReactNode;
}

const OutputContainer = ({ children }: Props) => {
    const { outputRef, useScrollEffect } = OutputContainerLogic();
    useScrollEffect(children);

    return (
        <StyledOutputContainer ref={outputRef}>
            {children}
        </StyledOutputContainer>
    );
};

export default OutputContainer;
