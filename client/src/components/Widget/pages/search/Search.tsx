import React, { useEffect, useState } from "react";
import ServiceList from "../../../Services/ServiceList/ServiceList";
import LargeService from "../../../Services/LargeService/LargeService";
import { Service } from "../../../../types";
import LocationBar from "../../../LocationBar/LocationBar";
import OutputContainer from "../../../OutputContainer/OutputContainer";

interface Props {
    searchResults: Service[];
}

const Search = ({ searchResults }: Props) => {
    const [focus, setFocus] = useState<number | null>(null);

    useEffect(() => {
        setFocus(null);
    }, [searchResults]);

    return (
        <>
            <LocationBar />
            <OutputContainer>
                {focus ? (
                    <LargeService id={focus} setFocus={setFocus} />
                ) : (
                    <ServiceList services={searchResults} setFocus={setFocus} />
                )}
            </OutputContainer>
        </>
    );
};

export default Search;
