import {
    SelectStyles,
    StyledDistanceSelect,
    StyledLocationBar,
    StyledLocationSelect,
} from "./LocationBar.styles";
import LocationBarLogic from "./LocationBar.logic";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Select from "react-select";
import SearchInputContext from "../SearchInputContext";
import { useContext } from "react";

interface Props {
    locationPlaceholder: string;
    distancePlaceholder: string;
}

const LocationBar = ({ locationPlaceholder, distancePlaceholder }: Props) => {
    const { geoSearchBody, setGeoSearchBody } = useContext(SearchInputContext);
    const {
        geoInputLocation,
        setGeoInputLocation,
        useLocationInputChange,
        distanceSelectOptions,
        handleDistanceChange,
    } = LocationBarLogic(geoSearchBody, setGeoSearchBody);
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
                        placeholder: `${locationPlaceholder}`,
                    }}
                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
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
                    placeholder={distancePlaceholder}
                    inputId="select-distance"
                    data-testid="distance-select"
                    isSearchable
                />
            </StyledDistanceSelect>
        </StyledLocationBar>
    );
};

export default LocationBar;
