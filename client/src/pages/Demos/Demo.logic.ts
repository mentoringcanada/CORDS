import { useEffect, useState } from "react";
import { getSearchResults } from "../../helper/API";
import { Service } from "../../types";

const DemoLogic = () => {
    // State
    const [similar, setSimilar] = useState<Service[]>([]);

    const handleSimilar = (description: string) => {
        const searchBody = {
            search: description,
        };
        getSearchResults(searchBody).then((res) => setSimilar(res));
    };

    const useHandleDemoChange = (description: string) => {
        useEffect(() => {
            setSimilar([]);
        }, [description]);
    };

    return { similar, handleSimilar, useHandleDemoChange };
};

export default DemoLogic;
