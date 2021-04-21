// Imports
import React, { useState } from "react";
import OutputBox from "../../widget/containers/OutputBox";
import ServiceList from "../../widget/services/ServiceList";
import SpecificResult from "../../widget/services/SpecificResult";
import { getResults } from "../../widget/utils/api";
import Demo from "../common/Demo";

const Demo3 = () => {
    // State
    const [similar, setSimilar] = useState([]);
    const [focus, setFocus] = useState<number | null>(null);
    const desc =
        "Drop-off site for clothing, textiles, household items, electronics, furniture and more";

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
            {similar && (
                <OutputBox style={{ height: "50vh" }}>
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

export default Demo3;
