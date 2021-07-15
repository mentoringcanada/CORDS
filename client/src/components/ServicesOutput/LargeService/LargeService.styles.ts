import styled from "styled-components";

export const StyledLargeService = styled.div`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    .similar {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2rem -10px 10px -10px;
        width: calc(100% + 20px);
        height: 2rem;
        background-color: var(--primary-color);
        h3 {
            color: white;
        }
    }
    .lower {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }

    @media only screen and (max-width: 768px) {
        .lower {
            flex-wrap: wrap;
        }
    }
`;

export const StyledInfo = styled.div`
    p,
    h2,
    h3 {
        margin-top: 0.4rem;
    }
    h2 {
        margin: 0rem 2rem 0.3rem 0rem;
        font-size: 1.4rem;
    }
    p {
        font-size: 0.8rem;
        line-height: 1.1rem;
        color: #4d5156;
    }
`;

export const StyledBackButton = styled.button`
    background-color: transparent;
    color: black;
    font-size: 1.5rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #aaa;
    :hover {
        color: #999;
    }
`;

export const StyledLinks = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    a {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 0.85rem;
        border-radius: 1rem;
        padding: 0.3rem 0.7rem 0.3rem 0.5rem;
        background-color: var(--primary-color);
        font-family: var(--secondary-font), Arial, Helvetica, sans-serif;
        font-weight: bold;
        color: white;
        text-decoration: none;
        margin-top: 1rem;
        svg {
            margin-right: 0.5rem;
        }
    }
`;

export const StyledDescription = styled.div`
    align-self: flex-start;
    font-size: 0.8rem;
    color: #4d5156;
    margin-top: 0.8rem;
    ul {
        margin: 0 0 0.5rem 1rem !important;
    }
    a {
        word-wrap: break-word;
        max-width: 100%;
    }
    margin-bottom: 0.5rem;
`;

export const StyledMapsContainer = styled.div`
    display: flex;
    align-items: flex-end;
    min-height: 15rem;
    min-width: 15rem;
    margin-left: 0.5rem;
    margin-top: 2.3rem;
    @media only screen and (max-width: 768px) {
        margin-top: 0.5rem;
        min-width: 5rem;
        width: 100%;
        margin-left: 0rem;
        justify-content: center;
    }
`;
