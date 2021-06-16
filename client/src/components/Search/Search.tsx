import ServiceOutput from "./Services/ServicesOutput/ServicesOutput";
import SearchLogic from "./Search.logic";
import SearchContext from "./SearchContext";
import FilterBar from "./FilterBar/FilterBar";
import SearchBar from "./SearchBar/SearchBar";

interface Props {
    outputRef?: React.MutableRefObject<any>;
}

const Search = ({ outputRef }: Props) => {
    const { search, setSearch, handleGeoSearch, useOnPageChange } =
        SearchLogic();
    useOnPageChange(search.page);

    return (
        <>
            <SearchContext.Provider value={{ search, setSearch }}>
                <SearchBar handleGeoSearch={handleGeoSearch} />
                <FilterBar />
                <div className="break" />
                <ServiceOutput outputRef={outputRef ? outputRef : undefined} />
            </SearchContext.Provider>
        </>
    );
};

export default Search;
