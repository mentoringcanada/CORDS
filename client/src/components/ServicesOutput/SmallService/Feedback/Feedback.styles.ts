import styled from "styled-components";

export const StyledFeedbackButton = styled.div`
    margin: -0.2rem;
    margin-top: 0.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0.75rem;
    color: #b33a3abb;
    :hover {
        text-decoration: underline;
    }
    button {
        background-color: #b33a3a;
        min-width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        margin-left: 0.3rem;
        :hover {
            background-color: #b33a3add;
        }
    }
`;

export const StyledFeedbackModal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #ffffffaa;
    z-index: 1;
    .container {
        display: flex;
        flex-direction: column;
        cursor: initial;

        padding: 1.5rem;
        position: relative;
        background-color: white;
        box-shadow: 0px 0px 2px gray;
        z-index: 2;
        width: 26rem;
        border-radius: 0.3rem;
        h3 {
            font-size: 1.4rem;
        }
        p {
            margin: 0.3rem 0;
            font-size: 0.85rem;
        }
        form {
            display: flex;
            flex-direction: column;
            margin: 0.5rem 0.5rem 0 0.5rem;
            label {
                display: block;
                font-size: 0.9rem;
                color: #aaa;
                text-align: center;
                font-family: var(--secondary-font), Arial, Helvetica, sans-serif;
                text-align: center;
                textarea {
                    font-size: 0.8rem;
                    padding: 0.2rem;
                    resize: none;
                    border-radius: 0.2rem;
                    border: 1px solid #bbb;
                    width: 100%;
                    height: 5rem;
                    margin: 0.5rem 0;
                }
            }
            button {
                align-self: flex-end;
                background-color: #b33a3a;
                padding: 0.3rem 1rem;
                border-radius: 0.3rem;
                font-size: 1rem;
            }
        }
    }
    .close-button {
        color: #ccc;
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
