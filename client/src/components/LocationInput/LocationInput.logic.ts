import { useContext, useEffect, useState } from "react";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import UserContext from "../../helper/user/UserContext";

const LocationInputLogic = () => {
    const [location, setLocation] = useState<any>(null);
    const { setUser } = useContext(UserContext);

    const useUpdateLocation = (location: any) => {
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
    };

    return { location, setLocation, useUpdateLocation };
};

export default LocationInputLogic;
