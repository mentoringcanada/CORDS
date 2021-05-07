// Imports
import React, { useState } from "react";
import styled from "styled-components";

// Styling
const StyledPopUp = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #ffffff77;
    z-index: 10;
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 2rem;
        border-radius: 1rem;
        background-color: white;
        font-family: var(--secondary-font);
        font-size: 1.5rem;
        box-shadow: 2px 2px 5px grey;
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
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            color: white;
            font-weight: bold;
            background-color: var(--primary-color);
        }
    }
`;

// Props
interface Props {
    setAllowUse: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUp = ({ setAllowUse }: Props) => {
    const [password, setPassword] = useState("");

    return (
        <StyledPopUp>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    password === "cordspass" && setAllowUse(true);
                }}
            >
                Welcome to the CORDS Demo
                <label>
                    PASSWORD
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                <input type="submit" />
            </form>
        </StyledPopUp>
    );
};

export default PopUp;
