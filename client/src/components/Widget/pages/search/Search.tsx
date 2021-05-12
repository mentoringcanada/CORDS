// Imports
import React, { useState } from "react";

// Components
import ServiceList from "../../../Services/ServiceList/ServiceList";
import LargeService from "../../../Services/LargeService/LargeService";
import OutputBox from "../../../OutputBox/OutputBox";

// Types
import { Service } from "../../../../types";

// Props
interface Props {
    searchResults: Service[];
}

const Search = ({ searchResults }: Props) => {
    const [focus, setFocus] = useState<number | null>(null);

    return (
        <>
            <OutputBox>
                {focus ? (
                    <LargeService id={focus} setFocus={setFocus} />
                ) : (
                    <ServiceList services={searchResults} setFocus={setFocus} />
                )}
            </OutputBox>
        </>
    );
};

export default Search;
