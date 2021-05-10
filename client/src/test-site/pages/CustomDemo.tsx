// Imports
import React, { useState } from "react";
import OutputBox from "../../widget/containers/OutputBox";
import ServiceList from "../../widget/services/ServiceList";
import SpecificResult from "../../widget/services/SpecificResult";
import { getResults } from "../../widget/utils/api";
import Demo from "../common/Demo";
import { MdEdit } from "react-icons/md";

const CustomDemo = () => {
    const [similar, setSimilar] = useState<Service[]>([]);
    const [focus, setFocus] = useState<number | null>(null);
    const [customDesc, setCustomDesc] = useState("");
    const [customTitle, setCustomTitle] = useState("");

    const handleSimilar = () => {
        getResults({
            search: customDesc,
            lat: 0,
            lng: 0,
        }).then((res) => setSimilar(res));
    };
    return (
        <Demo>
            <label className="demo title">
                <input
                    type="text"
                    placeholder="Title"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    style={{ width: !customTitle ? "6rem" : "100%" }}
                />
                {!customTitle && <MdEdit />}
            </label>
            <label className="demo desc">
                <input
                    type="text"
                    placeholder="Description"
                    value={customDesc}
                    onChange={(e) => setCustomDesc(e.target.value)}
                    style={{ width: !customDesc ? "6rem" : "100%" }}
                />
                {!customDesc && <MdEdit />}
            </label>
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

export default CustomDemo;
