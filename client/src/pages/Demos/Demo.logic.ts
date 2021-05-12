// Imports
import { useState } from "react";
import { getSearchResults } from "../../helper/api";

// Types
import { Service } from "../../types";

const DemoLogic = () => {
    // State
    const [similar, setSimilar] = useState<Service[]>([]);
    const [focus, setFocus] = useState<number | null>(null);

    const handleSimilar = (description: string) => {
        getSearchResults({
            search: description,
            lat: 0,
            lng: 0,
        }).then((res) => setSimilar(res));
    };

    return { similar, focus, setFocus, handleSimilar };
};

export default DemoLogic;
