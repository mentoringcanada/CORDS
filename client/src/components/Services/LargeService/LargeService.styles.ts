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
    button.info {
        background-color: transparent;
        color: black;
        font-size: 1.5rem;
        position: absolute;
        top: 0.3rem;
        right: 0.3rem;
    }
    .link {
        display: flex;
        align-items: center;
        svg {
            color: #4d5156;
            margin: 0.5rem 0;
            font-size: 1.4rem;
        }
        a {
            margin-left: 0.5rem;
            font-family: var(--secondary-font), Arial, Helvetica, sans-serif;
            font-size: 0.85rem;
            color: #1a73e8;
        }
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

export const StyledSimilarBox = styled.div`
    border-radius: 3px;
    margin-top: 2rem;
    border: 2px solid var(--primary-color);
    .list {
        height: 15rem;
        overflow-y: scroll;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.4rem;
        width: 100%;
        height: 2rem;
        background-color: var(--primary-color);
        color: white;
    }
`;
