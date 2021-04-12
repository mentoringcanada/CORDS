// Imports
import React from "react";
import styled from "styled-components";

// Components
import Landing from "../Landing";
import ResultList from "../results/ResultList";

// Styling
const StyledOutputBox = styled.div`
    position: relative;
    border-radius: 0px 0px 3px 3px;
    height: 88%;
    width: 100%;
    background-color: var(--secondary-color);
    overflow-y: scroll;
    box-shadow: 2px 2px 5px grey;

    // Scroll bar
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 0px 0px 3px 0px;
    }
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

// Props
interface Props {
    services: Service[] | null;
}

// Component
const OutputBox = ({ services }: Props) => {
    return (
        <StyledOutputBox>
            {services ? <ResultList services={services} /> : <Landing />}
        </StyledOutputBox>
    );
};

export default OutputBox;
