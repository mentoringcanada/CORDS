import styled from "styled-components";

export const StyledDemoInfo = styled.div`
    & > p {
        margin: 0.5rem 0 1.5rem 0;
        line-height: 1.2;
        font-size: 0.95rem;
        color: #4d5156;
    }
    &.closed {
        display: none;
    }
`;

export const StyledToggle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: -0.75rem 0;
    height: 1.5rem;
    width: 100%;
    border-radius: 0.4rem;
    font-size: 1rem;
    transition: 0.1s linear background-color;
    :hover {
        background-color: #f4f4f4;
    }
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        svg {
            margin-left: 0.5rem;
            font-size: 1.4rem;
        }
    }
`;
