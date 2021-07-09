import styled from "styled-components";

export const StyledSelectionsButton = styled.button`
    margin-right: 2.5rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 2px solid var(--primary-color);
    background-color: transparent;
    transition: background-color 0.4s linear;
    :hover {
        background-color: #eee;
    }
    svg {
        color: var(--primary-color);
    }
`;
