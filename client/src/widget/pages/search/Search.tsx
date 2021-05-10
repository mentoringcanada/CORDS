// Imports
import React, { useState } from "react";

// Components
import ServiceList from "../../../general/services/ServiceList";
import SpecificResult from "../../../general/services/SpecificResult";
import OutputBox from "../../../general/OutputBox";
import LocationBox from "./LocationBox";

interface Props {
    results: Service[];
}

const Search = ({ results }: Props) => {
    // State
    const [focus, setFocus] = useState<number | null>(null);

    return (
        <>
            <LocationBox />
            <OutputBox>
                {focus ? (
                    <SpecificResult id={focus} setFocus={setFocus} />
                ) : (
                    <ServiceList services={results} setFocus={setFocus} />
                )}
            </OutputBox>
        </>
    );
};

export default Search;
