import { useEffect, useState } from "react";
import { getLocalLocation } from "../../helper/API";
import { GeoSearchBody } from "../../types";

const SearchInputLogic = () => {
    const [geoSearchBody, setGeoSearchBody] = useState<GeoSearchBody>({
        search: "",
        location: {
            lat: undefined,
            lng: undefined,
        },
        distance: undefined,
    });

    // Gets local location when location bar renders
    const useHandleLocalLocation = () => {
        useEffect(() => {
            getLocalLocation().then((localLocation: any) =>
                setGeoSearchBody(localLocation)
            );
        }, []);
    };

    return {
        geoSearchBody,
        setGeoSearchBody,
        useHandleLocalLocation,
    };
};

export default SearchInputLogic;
