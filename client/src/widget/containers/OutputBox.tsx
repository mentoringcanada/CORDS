// Imports
import { useEffect } from "react";
import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

// Styling
const StyledOutputBox = styled.div`
    position: relative;
    border-radius: 0px 0px 3px 3px;
    height: 100%;
    width: 100%;
    background-color: white;
    overflow-y: scroll;
    box-shadow: 2px 2px 5px grey;
`;

interface Props {
    children: React.ReactNode;
}

const OutputBox = ({ children }: Props) => {
    useEffect(() => {
        let outputBoxNode = ReactDOM.findDOMNode(this) as Element;
        if (outputBoxNode) outputBoxNode.scrollTop = 0;
    });
    return <StyledOutputBox>{children}</StyledOutputBox>;
};

export default OutputBox;
