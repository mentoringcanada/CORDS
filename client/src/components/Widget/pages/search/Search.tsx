import { useEffect, useState } from "react";
import ServiceList from "../../../Services/ServiceList/ServiceList";
import LargeService from "../../../Services/LargeService/LargeService";
import { StyledOutputBox } from "../../../../styles/StyledOutputBox";
import { Service } from "../../../../types";
import LocationBar from "../../../LocationBar/LocationBar";

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
            <StyledOutputBox className="widget">
                {focus ? (
                    <LargeService id={focus} setFocus={setFocus} />
                ) : (
                    <ServiceList services={searchResults} setFocus={setFocus} />
                )}
            </StyledOutputBox>
        </>
    );
};

export default Search;
