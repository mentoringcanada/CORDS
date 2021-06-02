import { GeoSearchBody } from "../../../types";
import {
    geocodeByPlaceId,
    geocodeByLatLng,
} from "react-google-places-autocomplete";
import { useEffect, useState } from "react";
import { getLocalLocation } from "../../../helper/API";

const distanceSelectOptions = [
    { value: 1, label: "1km" },
    { value: 3, label: "3km" },
    { value: 5, label: "5km" },
    { value: 10, label: "10km" },
    { value: 20, label: "20km" },
    { value: 50, label: "50km" },
];

const LocationBarLogic = (
    geoSearchBody: GeoSearchBody,
    setGeoSearchBody: React.Dispatch<React.SetStateAction<GeoSearchBody>>
) => {
    // Location
    const [geoInputLocation, setGeoInputLocation] = useState<any>();

    // Gets local location when location bar renders
    const useHandleLocalLocation = () => {
        useEffect(() => {
            const setLocalLocation = async () => {
                const localLocation: any = await getLocalLocation();
                setGeoSearchBody({
                    ...geoSearchBody,
                    location: localLocation,
                });
                const res = await geocodeByLatLng(localLocation);
                setGeoInputLocation({
                    value: {
                        place_id: res[0].place_id,
                    },
                    label: res[0].formatted_address,
                });
            };
            setLocalLocation();
        }, []);
    };

    const useLocationInputChange = (geoInputLocation: any) => {
        useEffect(() => {
            const setLocationContext = async () => {
                const res = await geocodeByPlaceId(
                    geoInputLocation.value.place_id
                );
                await setGeoSearchBody({
                    ...geoSearchBody,
                    location: {
                        lat: res[0].geometry.location.lat(),
                        lng: res[0].geometry.location.lng(),
                    },
                });
            };
            geoInputLocation && setLocationContext();
        }, [geoInputLocation]);
    };

    // Distance
    const handleDistanceChange = (distanceValue: any) => {
        setGeoSearchBody({
            ...geoSearchBody,
            distance: distanceValue.value,
        });
    };

    return {
        geoInputLocation,
        setGeoInputLocation,
        useLocationInputChange,
        useHandleLocalLocation,
        handleDistanceChange,
        distanceSelectOptions,
    };
};

export default LocationBarLogic;
