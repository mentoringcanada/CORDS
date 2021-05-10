// Imports
import React, { useState } from "react";
import OutputBox from "../../general/OutputBox";
import ServiceList from "../../general/services/ServiceList";
import SpecificResult from "../../general/services/SpecificResult";
import { getResults } from "../../widget/utils/api";
import Demo from "../common/Demo";

const DemoClothing = () => {
    // State
    const [similar, setSimilar] = useState<Service[]>([]);
    const [focus, setFocus] = useState<number | null>(null);
    const desc = "Drop-off site for donations of used/unwanted clothing";

    const handleSimilar = () => {
        getResults({
            search: desc,
            lat: 0,
            lng: 0,
        }).then((res) => setSimilar(res));
    };

    return (
        <Demo>
            <h2 className="demo">Clothing</h2>
            <p className="demo">{desc}</p>
            <button className="demo" onClick={handleSimilar}>
                View similar services
            </button>
            {similar && similar.length !== 0 && (
                <OutputBox>
                    {focus ? (
                        <SpecificResult id={focus} setFocus={setFocus} />
                    ) : (
                        <ServiceList services={similar} setFocus={setFocus} />
                    )}
                </OutputBox>
            )}
        </Demo>
    );
};

export default DemoClothing;
