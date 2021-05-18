import { Location } from "../../types";
import {
    SelectStyles,
    StyledDistanceSelect,
    StyledLocationBar,
    StyledLocationSelect,
} from "./LocationBar.styles";
import LocationBarLogic from "./LocationBar.logic";
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Select from "react-select";

interface Props {
    location: Location;
    setLocation: React.Dispatch<React.SetStateAction<Location>>;
}

const LocationBar = ({ location, setLocation }: Props) => {
    const {
        geoInputLocation,
        setGeoInputLocation,
        useLocationInputChange,
        distanceSelectOptions,
        handleDistanceChange,
    } = LocationBarLogic(location, setLocation);
    useLocationInputChange(geoInputLocation);
    const Styles = SelectStyles(true);

    return (
        <StyledLocationBar data-testid="location-bar">
            <StyledLocationSelect data-testid="location-select">
                <GooglePlacesAutocomplete
                    selectProps={{
                        value: geoInputLocation,
                        onChange: setGeoInputLocation,
                        styles: Styles,
                        placeholder: "Where",
                    }}
                    apiKey="AIzaSyAfKsvjQLoBQpRrWCEJraXSvMFnUunnOeI"
                    autocompletionRequest={{
                        componentRestrictions: { country: ["ca"] },
                    }}
                ></GooglePlacesAutocomplete>
            </StyledLocationSelect>
            <StyledDistanceSelect data-testid="distance-select">
                <Select
                    options={distanceSelectOptions}
                    styles={SelectStyles(false)}
                    onChange={handleDistanceChange}
                    placeholder="Within"
                    inputId="select-distance"
                    isSearchable
                />
            </StyledDistanceSelect>
        </StyledLocationBar>
    );
};

export default LocationBar;
