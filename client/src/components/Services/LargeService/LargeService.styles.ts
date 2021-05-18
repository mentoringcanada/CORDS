import styled from "styled-components";

export const StyledLargeService = styled.div`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    p.info,
    h2.info,
    h3.info {
        margin-top: 0.4rem;
    }
    h2.info {
        margin: 0rem 1.2rem 0.3rem 0rem;
        font-size: 1.2rem;
    }
    p.info {
        font-size: 0.8rem;
        line-height: 1.1rem;
        color: #4d5156;
    }
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
        padding: 0.3rem 0.5rem;
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
