import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    border-radius: 1rem;
    background-color: white;
    box-shadow: 0px 3px 7px 0px grey;
    &.widget {
        padding: 1rem;
    }
`;
