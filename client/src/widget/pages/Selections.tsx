// Imports
import React, { useEffect, useState } from "react";

// Component
import OutputBox from "../containers/OutputBox";
import ServiceList from "../services/ServiceList";
import SpecificResult from "../services/SpecificResult";

// Utils
import { getSelections } from "../utils/api";

const Selections = () => {
    const [selections, setSelections] = useState<Service[]>([]);
    const [focus, setFocus] = useState<number | null>(null);

    // Gets Selections
    useEffect(() => {
        getSelections().then((res) => setSelections(res));
    }, []);

    return (
        <>
            <OutputBox>
                Hello
                {focus ? (
                    <SpecificResult id={focus} setFocus={setFocus} />
                ) : (
                    <ServiceList services={selections} setFocus={setFocus} />
                )}
            </OutputBox>
        </>
    );
};

export default Selections;
