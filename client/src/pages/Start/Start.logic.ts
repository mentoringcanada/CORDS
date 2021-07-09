import { useEffect, useState } from "react";

const StartLogic = () => {
    const [allowUse, setAllowUse] = useState<null | boolean>(null);
    const [password, setPassword] = useState("");

    const useCheckAuth = () => {
        useEffect(() => {
            const auth = localStorage.getItem("auth");
            if (auth === "true") setAllowUse(true);
            else setAllowUse(false);
        });
    };

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "cordspass") {
            setAllowUse(true);
            localStorage.setItem("auth", "true");
        }
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value);

    return { allowUse, password, handleAuth, handlePassword, useCheckAuth };
};

export default StartLogic;
