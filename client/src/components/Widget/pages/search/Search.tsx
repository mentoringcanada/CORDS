import { useState } from "react";
import ServiceList from "../../../Services/ServiceList/ServiceList";
import LargeService from "../../../Services/LargeService/LargeService";
import OutputBox from "../../../OutputBox/OutputBox";
import { Service } from "../../../../types";
import LocationBar from "../../../LocationBar/LocationBar";

interface Props {
    searchResults: Service[];
}

const Search = ({ searchResults }: Props) => {
    const [focus, setFocus] = useState<number | null>(null);

    return (
        <>
            <LocationBar />
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
