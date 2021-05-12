// Imports
import { useEffect, useState } from "react";

// Component
import OutputBox from "../../OutputBox/OutputBox";
import ServiceList from "../../Services/ServiceList/ServiceList";
import LargeService from "../../Services/LargeService/LargeService";

// Utils
import { getSelections } from "../../../helper/api";

// Types
import { Service } from "../../../types";

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
                    <LargeService id={focus} setFocus={setFocus} />
                ) : (
                    <ServiceList services={selections} setFocus={setFocus} />
                )}
            </OutputBox>
        </>
    );
};

export default Selections;
