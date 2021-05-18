import styled from "styled-components";

export const StyledSmallService = styled.div`
    position: relative;
    padding: 0.8rem;
    margin: 0.5rem;
    border-radius: 0.3rem;
    cursor: pointer;
    box-shadow: 0px 4px 7px grey;
    transition: background-color 0.1s linear;
    background-color: white;
    :hover {
        background-color: #fbfbfb;
    }
    .service-title {
        width: 75%;
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

export const StyledDescription = styled.div`
    width: 100%;
    font-size: 0.8rem;
    margin-top: 1rem;
    color: #4d5156;
    font-size: 0.8rem;
    line-height: 1.1rem;
    ul {
        margin-left: 1rem;
    }
    a {
        display: block;
        word-wrap: break-word;
        max-width: 100%;
    }
`;
