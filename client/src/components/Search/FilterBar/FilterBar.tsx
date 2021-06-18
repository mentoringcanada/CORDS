import {
    SelectStyles,
    StyledDistanceSelect,
    StyledLocationBar,
    StyledLocationSelect,
    StyledServicesFilter,
} from "./FilterBar.styles";
import LocationBarLogic from "./FilterBar.logic";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Select from "react-select";

const FilterBar = () => {
    const {
        useLocationChange,
        distanceSelectOptions,
        useHandleLocalLocation,
        handleDistanceChange,
        handleFilterChange,
        searchFilters,
        searchBar,
        locationValue,
        setLocationValue,
        error,
        language,
        useOnLanguageChange,
        sortValue,
    } = LocationBarLogic();
    useLocationChange(locationValue);
    useHandleLocalLocation();
    const Styles = SelectStyles(true);
    useOnLanguageChange(language);

    if (error) return <p>Content collection error...</p>;

    return (
        <StyledLocationBar data-testid="location-bar">
            <StyledLocationSelect data-testid="location-select">
                <GooglePlacesAutocomplete
                    selectProps={{
                        value: locationValue,
                        onChange: setLocationValue,
                        styles: Styles,
                        placeholder: `${searchBar.locationPlaceholder}`,
                        noOptionsMessage: () =>
                            searchBar.locationMenuText
                                ? searchBar.locationMenuText
                                : "Search locations",
                    }}
                    autocompletionRequest={{
                        componentRestrictions: { country: ["ca"] },
                    }}
                ></GooglePlacesAutocomplete>
            </StyledLocationSelect>
            <StyledDistanceSelect data-testid="distance-select">
                <Select
                    defaultValue={{ label: "50km", value: 50 }}
                    options={distanceSelectOptions}
                    styles={SelectStyles(true)}
                    onChange={handleDistanceChange}
                    inputId="select-distance"
                    data-testid="distance-select"
                    isSearchable
                />
            </StyledDistanceSelect>
            <StyledServicesFilter>
                <Select
                    value={sortValue}
                    options={searchFilters}
                    styles={SelectStyles(false)}
                    onChange={handleFilterChange}
                    isSearchable={false}
                />
            </StyledServicesFilter>
        </StyledLocationBar>
    );
};

export default FilterBar;
