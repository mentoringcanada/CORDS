import React from "react";
import SearchInput from "../../../../pages/Search/SearchInput/SearchInput";
import SearchOutput from "../../../../pages/Search/SearchOutput/SearchOutput";
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
