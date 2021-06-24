import { useState, useContext, useEffect } from "react";
import { sendFeedback } from "../../../../../helper/API";
import SearchContext from "../../../SearchContext";

const FeedbackLogic = () => {
    const search = useContext(SearchContext);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleFeedback = (id: string, type: string) => {
        const feedbackBody = {
            item_id: Number(id),
            query: type === "search" ? search.search.query : "",
            sortOrder: type === "search" ? search.search.filter : "",
            msg: message,
            type,
        };

        sendFeedback(feedbackBody);
        setOpen(false);
    };

    const useOnOpenChange = (open: boolean) => {
        useEffect(() => {
            setMessage("");
        }, [open]);
    };

    return {
        open,
        setOpen,
        message,
        setMessage,
        handleFeedback,
        useOnOpenChange,
    };
};

export default FeedbackLogic;
