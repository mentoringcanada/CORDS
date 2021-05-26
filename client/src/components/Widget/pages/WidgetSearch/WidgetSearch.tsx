import SearchInput from "../../../SearchInput/SearchInput";
import ServiceOutput from "../../../Services/ServicesOutput/ServicesOutput";
import WidgetSearchLogic from "./WidgetSearch.logic";

const WidgetSearch = () => {
    const { searchResults, searchState, setSearchState, handleGeoSearch } =
        WidgetSearchLogic();

    return (
        <>
            <SearchInput handleGeoSearch={handleGeoSearch} />
            <ServiceOutput
                serviceResults={searchResults}
                searchState={searchState}
                setSearchState={setSearchState}
            />
        </>
    );
};

export default WidgetSearch;
