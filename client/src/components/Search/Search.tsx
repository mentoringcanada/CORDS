import ServiceOutput from "../Services/ServicesOutput/ServicesOutput";
import SearchLogic from "./Search.logic";
import SearchInput from "./SearchInput/SearchInput";

interface Props {
    outputRef?: React.MutableRefObject<any>;
}

const Search = ({ outputRef }: Props) => {
    const { searchResults, searchState, setSearchState, handleGeoSearch } =
        SearchLogic();

    return (
        <>
            <SearchInput handleGeoSearch={handleGeoSearch} />
            <div className="break" />
            <ServiceOutput
                serviceResults={searchResults}
                searchState={searchState}
                outputRef={outputRef ? outputRef : undefined}
                setSearchState={setSearchState}
            />
        </>
    );
};

export default Search;
