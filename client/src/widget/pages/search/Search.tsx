// Imports
import React, { useState } from "react";

// Components
import ServiceList from "../../services/ServiceList";
import SpecificResult from "../../services/SpecificResult";
import OutputBox from "../../containers/OutputBox";
import LocationBox from "./LocationBox";
import ClearButton from "../../common/ClearButton";

interface Props {
    results: Service[];
    setResults: React.Dispatch<React.SetStateAction<Service[]>>;
}

const Search = ({ results, setResults }: Props) => {
    // State
    const [focus, setFocus] = useState<number | null>(null);

    return (
        <>
            <LocationBox />
            <OutputBox>
                <ClearButton onClick={() => setResults([])}>Clear</ClearButton>
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
