import React, { useState } from "react";

const CustomDemoLogic = () => {
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setDescription(e.target.value);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value);

    return { description, title, handleDescriptionChange, handleTitleChange };
};

export default CustomDemoLogic;
