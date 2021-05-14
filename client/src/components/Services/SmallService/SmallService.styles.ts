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
    h3 {
        width: 75%;
    }
    /* Link button */
    a,
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.2rem;
        font-size: 1.2rem;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 2px solid var(--primary-color);
        background-color: transparent;
        transition: background-color 0.4s linear;
    }
    a:hover,
    button:hover {
        background-color: #eee;
    }
    svg {
        color: var(--primary-color);
    }
    .buttons {
        display: flex;
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
    }
    p {
        margin-top: 0.5rem;
        color: #4d5156;
        font-size: 0.8rem;
        line-height: 1.1rem;
    }
`;
