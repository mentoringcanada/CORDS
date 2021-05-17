import { useState } from "react";
import { Location } from "../../types";

const LocationContextLogic = () => {
    const [location, setLocation] = useState<Location>({
        lat: undefined,
        lng: undefined,
        distance: undefined,
    });

    const getLocalLocation = () => {
        return new Promise((res) => {
            navigator.geolocation.getCurrentPosition((position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                res(location);
            });
        });
    };

    return { location, setLocation, getLocalLocation };
};

export default LocationContextLogic;
