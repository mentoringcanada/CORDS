import { useEffect, useState } from "react";
import { Service, Location } from "../../types";

const SearchLogic = () => {
    const [searchResults, setSearchResults] = useState<Service[]>([]);
    const [location, setLocation] = useState<Location>({
        lat: undefined,
        lng: undefined,
        distance: undefined,
    });

    const getLocalLocation = async () => {
        return await new Promise((res) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const localLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        res(localLocation);
                    },
                    (error) => {
                        console.log(`Location error: ${error.code}`);
                    }
                );
            }
        });
    };

    /* Sets app default values */
    const useHandleStartFunctions = () => {
        useEffect(() => {
            getLocalLocation().then((localLocation: any) =>
                setLocation({
                    lat: localLocation.lat,
                    lng: localLocation.lng,
                    distance: location.distance,
                })
            );
        }, []);
    };

    return {
        location,
        setLocation,
        searchResults,
        setSearchResults,
        useHandleStartFunctions,
    };
};

export default SearchLogic;
