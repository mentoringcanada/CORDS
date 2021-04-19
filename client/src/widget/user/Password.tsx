// Imports
import React, { FormEvent, useState } from "react";
import styled from "styled-components";

// Styling
const StyledPassword = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: white;
    margin-top: 1rem;
    input {
        height: 1.5rem;
        border-radius: 0.3rem;
        width: 12rem;
        margin-top: 1rem;
        padding: 0.4rem;
    }
`;

// Props
interface Props {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Password = ({ setAuth }: Props) => {
    const [password, setPassword] = useState("");

    const handlePassword = (e: FormEvent) => {
        e.preventDefault();
        if (password === "cordspass") {
            setAuth(true);
        }
    };

    return (
        <StyledPassword>
            <h2>Password</h2>
            <form onSubmit={handlePassword}>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </form>
        </StyledPassword>
    );
};

export default Password;
