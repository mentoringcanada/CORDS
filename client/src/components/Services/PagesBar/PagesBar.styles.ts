import styled from "styled-components";

export const StyledPagesBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const StyledPageBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #ccc;
    color: #aaa;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    border-radius: 0.3rem;
    &.highlighted {
        background-color: var(--primary-color);
        color: white;
        border: none;
    }
    svg {
        font-size: 1.7rem;
    }
`;
