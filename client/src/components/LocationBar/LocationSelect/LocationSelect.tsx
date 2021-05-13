// Import
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { StyledLocationSelect } from "./LocationSelect.styles";
import { SelectStyles } from "../LocationBar.styles";
import LocationSelectLogic from "./LocationSelect.logic";

const LocationInput = () => {
    const { geoInputLocation, setGeoInputLocation, useLocationInputChange } =
        LocationSelectLogic();
    useLocationInputChange(geoInputLocation);
    const Styles = SelectStyles(true);

    return (
        <StyledLocationSelect>
            <GooglePlacesAutocomplete
                selectProps={{
                    geoInputLocation,
                    onChange: setGeoInputLocation,
                    styles: Styles,
                    placeholder: "Where...",
                }}
                apiKey="AIzaSyAfKsvjQLoBQpRrWCEJraXSvMFnUunnOeI"
                autocompletionRequest={{
                    componentRestrictions: { country: ["ca"] },
                }}
            ></GooglePlacesAutocomplete>
        </StyledLocationSelect>
    );
};

export default LocationInput;
