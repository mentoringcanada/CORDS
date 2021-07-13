import SearchLogic from "./Search.logic";
import SearchContext from "./SearchContext";
import FilterBar from "./FilterBar/FilterBar";
import SearchBar from "./SearchBar/SearchBar";
import SearchState from "./SearchState/SearchState";
import LargeService from "../../components/ServicesOutput/LargeService/LargeService";
import { NavLink, Route, Switch } from "react-router-dom";
import ServiceResults from "./ServiceResults/ServiceResults";
import Home from "./Home/Home";
import Selections from "./Selections/Selections";
import { StyledPageContainer } from "../../styles/StyledPageContainer";
import { StyledSearch, StyledTabs } from "./Search.styles";

const Search = () => {
    const { search, setSearch, language } = SearchLogic();

    return (
        <StyledPageContainer>
            <StyledSearch>
                <SearchContext.Provider value={{ search, setSearch }}>
                    <SearchBar />
                    <FilterBar />
                    <div className="break" />
                    <StyledTabs>
                        <NavLink
                            to={
                                search.query !== ""
                                    ? `/search/results?query=${search.query}&distance=${search.distance}&lat=${search.location.lat}&lng=${search.location.lng}&filter=${search.filter}&ln=${language}&page=1`
                                    : "/search/results"
                            }
                            activeClassName="active"
                            className="left"
                        >
                            Results
                        </NavLink>
                        <NavLink
                            to="/search/selections"
                            activeClassName="active"
                            className="right"
                            exact
                        >
                            Selections
                        </NavLink>
                    </StyledTabs>
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
                        <Route path="/search/selections">
                            <Selections />
                        </Route>
                    </Switch>
                </SearchContext.Provider>
            </StyledSearch>
        </StyledPageContainer>
    );
};

export default Search;
