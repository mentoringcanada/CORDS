import styled from "styled-components";

export const StyledSmallService = styled.div`
    position: relative;
    padding: 0.8rem;
    margin: 0.5rem 0.5rem 1rem 0.5rem;
    border-radius: 0.2rem;
    cursor: pointer;
    transition: background-color 0.1s linear;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: rgb(59 59 59 / 5%) 0px 5px 15px 0px;
    :hover {
        background-color: #fbfbfb;
    }
    .service-title {
        width: 75%;
    }
    .lower {
        display: flex;
        margin-top: 1.2rem;
        justify-content: space-between;
        height: 2rem;
    }
`;

export const StyledLink = styled.a`
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

export const StyledSelectButton = styled.button`
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
    &.large {
        margin-right: 0;
    }
`;

export const StyledLogo = styled.a`
    margin-right: 1rem;
    img {
        height: 2rem;
    }
`;
