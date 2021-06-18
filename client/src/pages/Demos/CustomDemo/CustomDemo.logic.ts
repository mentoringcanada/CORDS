import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { GET_CUSTOM_DEMO_CONTENT } from "../../../helper/CMS";
import LanguageContext from "../../../helper/LanguageContext";
import { Service } from "../../../types";

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

    const getName = (service: Service) => {
        let name =
            language === "fr-CA" && service.nom !== ""
                ? service.nom
                : service.name;

        name = name.replace(/[\u{0080}-\u{FFFF}]/gu, "");
        return name;
    };

    const getDescription = (service: Service) => {
        let desc =
            language === "fr-CA" && service.description_fr !== ""
                ? service.description_fr
                : service.description;

        desc = desc.replace(/[\u{0080}-\u{FFFF}]/gu, "");
        return desc;
    };

    return {
        description,
        title,
        handleDescriptionChange,
        handleTitleChange,
        error,
        customDemoContent,
        getName,
        getDescription,
    };
};

export default CustomDemoLogic;
