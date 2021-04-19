// Import
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import dotenv from "dotenv";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import UserContext from "../../user/UserContext";
dotenv.config();

// Styling
const StyledLocationBox = styled.form`
    width: 100%;
`;

const customStyling = {
    container: (provided: any) => ({
        ...provided,
        fontFamily: "var(--secondary-font), Arial",
        fontSize: "0.8rem",
        color: "#222222",
    }),
    control: (provided: any) => ({
        ...provided,
        borderRadius: "3px 3px 0px 0px",
    }),
};

// Component
// Finds location, geocodes and sets user context with lat and long
const LocationBox = () => {
    const [location, setLocation] = useState<any>(null);
    const { setUser } = useContext(UserContext);

    // Set location when location changes
    useEffect(() => {
        const setLocation = async () => {
            const res = await geocodeByPlaceId(location.value.place_id);
            await setUser({
                location: {
                    lat: res[0].geometry.location.lat(),
                    lng: res[0].geometry.location.lng(),
                },
            });
        };
        location && setLocation();
    }, [location]);

    return (
        <StyledLocationBox>
            <GooglePlacesAutocomplete
                selectProps={{
                    location,
                    onChange: setLocation,
                    styles: customStyling,
                }}
                apiKey="temp"
                autocompletionRequest={{
                    componentRestrictions: { country: ["ca"] },
                }}
            ></GooglePlacesAutocomplete>
        </StyledLocationBox>
    );
};

export default LocationBox;
