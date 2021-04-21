// Imports
import React, { useState } from "react";
import OutputBox from "../../widget/containers/OutputBox";
import ServiceList from "../../widget/services/ServiceList";
import SpecificResult from "../../widget/services/SpecificResult";
import { getResults } from "../../widget/utils/api";
import Demo from "../common/Demo";

const Demo1 = () => {
    const [similar, setSimilar] = useState([]);
    const [focus, setFocus] = useState<number | null>(null);
    const desc =
        "Free or low-cost food to individuals and families in need on an on-going, seasonal, and emergency basis.";

    const handleSimilar = () => {
        getResults({
            search: desc,
            lat: 0,
            lng: 0,
        }).then((res) => setSimilar(res));
    };

    return (
        <Demo>
            <h1>Food Bank</h1>
            <p>{desc}</p>
            <button onClick={handleSimilar}>View similar services</button>
            {similar && (
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

export default Demo1;
