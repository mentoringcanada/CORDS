import { useContext, useEffect, useState } from "react";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import LocationContext from "../../../helper/LocationContext/LocationContext";

const LocationSelect = () => {
    const { location, setLocation } = useContext(LocationContext);
    const [geoInputLocation, setGeoInputLocation] = useState<any>();

    const useLocationInputChange = (geoInputLocation: any) => {
        useEffect(() => {
            const setLocationContext = async () => {
                const res = await geocodeByPlaceId(
                    geoInputLocation.value.place_id
                );
                await setLocation({
                    lat: res[0].geometry.location.lat(),
                    lng: res[0].geometry.location.lng(),
                    distance: location.distance,
                });
            };
            geoInputLocation && setLocationContext();
        }, [geoInputLocation]);
    };

    return { geoInputLocation, setGeoInputLocation, useLocationInputChange };
};

export default LocationSelect;
