import SearchLogic from "./Search.logic";
import SearchContext from "./SearchContext";
import FilterBar from "./FilterBar/FilterBar";
import SearchBar from "./SearchBar/SearchBar";
import SearchState from "./SearchState/SearchState";
import LargeService from "../ServicesOutput/LargeService/LargeService";
import { Route, Switch } from "react-router-dom";
import ServiceResults from "../ServicesOutput/ServiceResults/ServiceResults";
import Home from "./Home/Home";

const Search = () => {
    const { search, setSearch } = SearchLogic();

    return (
        <>
            <SearchContext.Provider value={{ search, setSearch }}>
                <SearchBar />
                <FilterBar />
                <div className="break" />
                <SearchState />
                <Switch>
                    <Route exact path="/search">
                        <Home />
                    </Route>
                    <Route path="/search/service/:id">
                        <LargeService />
                    </Route>
                    <Route path="/search/results">
                        <ServiceResults />
                    </Route>
                </Switch>
            </SearchContext.Provider>
        </>
    );
};

export default Search;
