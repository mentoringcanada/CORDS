import { useState } from "react";

const StartLogic = () => {
    const [allowUse, setAllowUse] = useState(false);
    const [password, setPassword] = useState("");

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        password === "cordspass" && setAllowUse(true);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value);

    return { allowUse, password, handleAuth, handlePassword };
};

export default StartLogic;
