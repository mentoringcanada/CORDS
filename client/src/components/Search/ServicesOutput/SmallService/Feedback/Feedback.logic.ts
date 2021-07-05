import { useQuery } from "@apollo/client";
import { useState, useContext, useEffect } from "react";
import { sendFeedback } from "../../../../../helper/API";
import { GET_FEEDBACK } from "../../../../../helper/CMS";
import LanguageContext from "../../../../../helper/LanguageContext";
import SearchContext from "../../../SearchContext";

const FeedbackLogic = () => {
    const search = useContext(SearchContext);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const { language } = useContext(LanguageContext);

    const handleFeedback = (id: string, type: string) => {
        const feedbackBody = {
            item_id: Number(id),
            query: type === "search" ? search.search.query : "",
            sortOrder: type === "search" ? search.search.filter : "",
            msg: message,
            type,
        };

        sendFeedback(feedbackBody).catch(() => {
            console.log("Feedback error");
        });
        setOpen(false);
    };

    const useOnOpenChange = (open: boolean) => {
        useEffect(() => {
            setMessage("");
        }, [open]);
    };

    // Text content
    const { error, data } = useQuery(GET_FEEDBACK, {
        variables: { language },
    });

    const feedbackContent = data ? data.feedbacks[0] : [];

    return {
        open,
        setOpen,
        message,
        setMessage,
        handleFeedback,
        useOnOpenChange,
        error,
        feedbackContent,
    };
};

export default FeedbackLogic;
