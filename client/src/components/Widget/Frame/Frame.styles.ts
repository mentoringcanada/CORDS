// Imports
import styled from "styled-components";

export const StyledFrame = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    width: 375px;
    height: 550px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 2px 2px 5px grey;

    @media only screen and (max-width: 375px) {
        width: 90%;
        bottom: 0.5rem;
        right: 0.5rem;
    }
`;
