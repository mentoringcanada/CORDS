// Import
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { LocationInputStyles } from "./LocationInput.styles";
import LocationInputLogic from "./LocationInput.logic";

const LocationInput = () => {
    const { location, setLocation, useUpdateLocation } = LocationInputLogic();
    useUpdateLocation();

    return (
        <GooglePlacesAutocomplete
            selectProps={{
                location,
                onChange: setLocation,
                styles: LocationInputStyles,
            }}
            apiKey="AIzaSyAfKsvjQLoBQpRrWCEJraXSvMFnUunnOeI"
            autocompletionRequest={{
                componentRestrictions: { country: ["ca"] },
            }}
        ></GooglePlacesAutocomplete>
    );
};

export default LocationInput;
