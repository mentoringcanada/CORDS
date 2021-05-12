import React from "react";
import { StyledOutputBox } from "./OutputBox.styles";

interface Props {
    children: React.ReactNode;
}

const OutputBox = ({ children }: Props) => {
    return <StyledOutputBox>{children}</StyledOutputBox>;
};

export default OutputBox;
