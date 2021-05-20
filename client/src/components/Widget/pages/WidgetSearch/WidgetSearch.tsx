import SearchInput from "../../../SearchInput/SearchInput";
import SearchOutput from "../../../SearchOutput/SearchOutput";
import WidgetSearchLogic from "./WidgetSearch.logic";

const WidgetSearch = () => {
    const { searchResults, searchState, setSearchState, handleGeoSearch } =
        WidgetSearchLogic();

    return (
        <>
            <SearchInput handleGeoSearch={handleGeoSearch} />
            <SearchOutput
                searchResults={searchResults}
                searchState={searchState}
                setSearchState={setSearchState}
            />
        </>
    );
};

export default WidgetSearch;
