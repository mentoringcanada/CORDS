import ServiceOutput from "./ServicesOutput/ServicesOutput";
import SearchLogic from "./Search.logic";
import SearchContext from "./SearchContext";
import FilterBar from "./FilterBar/FilterBar";
import SearchBar from "./SearchBar/SearchBar";
import SearchState from "./SearchState/SearchState";

interface Props {
    outputRef?: React.MutableRefObject<any>;
}

const Search = ({ outputRef }: Props) => {
    const { search, setSearch, handleGeoSearch } = SearchLogic();

    return (
        <>
            <SearchContext.Provider value={{ search, setSearch }}>
                <SearchBar handleGeoSearch={handleGeoSearch} />
                <FilterBar />
                <div className="break" />
                <SearchState />
                {search.services.length > 0 && (
                    <ServiceOutput
                        outputRef={outputRef}
                        handleServices={handleGeoSearch}
                    />
                )}
            </SearchContext.Provider>
        </>
    );
};

export default Search;
