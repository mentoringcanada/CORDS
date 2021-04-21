// Imports
import React, { useState } from "react";
import OutputBox from "../../widget/containers/OutputBox";
import ServiceList from "../../widget/services/ServiceList";
import SpecificResult from "../../widget/services/SpecificResult";
import { getResults } from "../../widget/utils/api";
import Demo from "../common/Demo";

const Demo2 = () => {
    const [similar, setSimilar] = useState([]);
    const [focus, setFocus] = useState<number | null>(null);
    const desc =
        "we provide temporary accommodation and related support services that assist people to move into housing";

    const handleSimilar = () => {
        getResults({
            search: desc,
            lat: 0,
            lng: 0,
        }).then((res) => setSimilar(res));
    };

    return (
        <Demo>
            <h1>Shelter</h1>
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

export default Demo2;
