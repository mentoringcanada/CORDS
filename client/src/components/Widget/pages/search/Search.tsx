import ServicesOutput from "../../../Services/ServicesOutput/ServicesOutput";
import { Service } from "../../../../types";
import LocationBar from "../../../LocationBar/LocationBar";
import OutputContainer from "../../../OutputContainer/OutputContainer";

interface Props {
    searchResults: Service[];
}

const Search = ({ searchResults }: Props) => {
    return (
        <>
            <LocationBar />
            <OutputContainer>
                <ServicesOutput services={searchResults} />
            </OutputContainer>
        </>
    );
};

export default Search;
