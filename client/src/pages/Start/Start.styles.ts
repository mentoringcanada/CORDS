import styled from "styled-components";

export const StyledPopUp = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #ffffff99;
    z-index: 10;
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-family: var(--secondary-font);
        padding: 1rem 2rem;
        font-size: 1.5rem;
        label {
            display: flex;
            margin-top: 1.5rem;
            flex-direction: column;
            align-items: center;
            color: #666;
            font-size: 0.7rem;
            input {
                margin-top: 0.5rem;
                border: 1px solid gray;
                border-radius: 0.4rem;
                padding: 0.5rem;
                font-size: 1rem;
                width: 100%;
                height: 2rem;
            }
        }
        input[type="submit"] {
            cursor: pointer;
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            color: white;
            font-weight: bold;
            background-color: var(--primary-color);
            border-radius: 0.4rem;
            -webkit-appearance: none;
        }
    }
    @media only screen and (max-width: 768px) {
        form {
            padding: 0;
            font-size: 5.2vw;
            label {
                input {
                    padding: 0.3rem;
                    height: 1.5rem;
                    font-size: 0.8rem;
                }
            }
        }
    }
`;
