import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { GET_CUSTOM_DEMO_CONTENT } from "../../../helper/CMS";
import LanguageContext from "../../../helper/LanguageContext";

const CustomDemoLogic = () => {
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setDescription(e.target.value);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value);

    // Text content
    const { language } = useContext(LanguageContext);
    const { error, data } = useQuery(GET_CUSTOM_DEMO_CONTENT, {
        variables: { language },
    });
    const customDemoContent = data ? data.demos[0] : {};

    return {
        description,
        title,
        handleDescriptionChange,
        handleTitleChange,
        error,
        customDemoContent,
    };
};

export default CustomDemoLogic;
