import styled from "styled-components";

export const StyledPagesBar = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 20rem;
`;

export const StyledPageBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    color: #aaa;
    border: 2px solid #ccc;
    border-radius: 0.2rem;
    cursor: pointer;

    &.current-page {
        border: none;
        background-color: var(--primary-color);
        color: white;
    }
`;
