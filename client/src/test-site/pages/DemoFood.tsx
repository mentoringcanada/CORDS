// Imports
import React, { useState } from "react";
import OutputBox from "../../widget/containers/OutputBox";
import ServiceList from "../../widget/services/ServiceList";
import SpecificResult from "../../widget/services/SpecificResult";
import { getResults } from "../../widget/utils/api";
import Demo from "../common/Demo";

const DemoFood = () => {
    const [similar, setSimilar] = useState<Service[]>([]);
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
            <h2 className="demo">Food Bank</h2>
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

export default DemoFood;
