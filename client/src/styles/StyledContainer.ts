import styled from "styled-components";

export const StyledContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    border-radius: 1rem;
    background-color: white;
    box-shadow: 0px 1px 3px 0px grey;
    &.widget {
        padding: 1rem;
    }
    @media only screen and (max-width: 768px) {
        padding: 0.8rem;
    } ;
`;
