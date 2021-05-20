import ServiceOutput from "../../../components/Services/ServicesOutput/ServicesOutput";
import { Service } from "../../../types";

interface Props {
    searchResults: Service[];
    searchState: string;
    setSearchState: React.Dispatch<React.SetStateAction<string>>;
}

const SearchOutput = ({
    searchResults,
    searchState,
    setSearchState,
}: Props) => {
    return (
        <ServiceOutput
            services={searchResults}
            location={{ lat: 43.6532, lng: -79.3832 }}
            searchState={searchState}
            setSearchState={setSearchState}
        />
    );
};

export default SearchOutput;
