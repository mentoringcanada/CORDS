import styled from "styled-components";

export const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-color);
    min-height: 2.2rem;
    width: 100%;
    border-radius: 10px 10px 0 0;
    h3 {
        font: var(--primary-font);
        font-weight: bold;
        font-size: 0.8rem;
        color: white;
    }
`;

export const StyledCloseButton = styled.button`
    font-size: 0.8rem;
    position: absolute;
    border-radius: 0.2rem;
    width: 1.2rem;
    height: 1.2rem;
    top: 0.5rem;
    right: 0.5rem;
    background-color: transparent;
    transition: background-color 0.1s linear;
    :hover {
        background-color: #ffffff22;
    }
`;
