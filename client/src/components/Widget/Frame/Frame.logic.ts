import { useContext, useEffect, useState } from "react";
import { setSession } from "../../../helper/api";
import { getLocalLocation } from "../../../helper/LocationContext/LocationContext.logic";
import LocationContext from "../../../helper/LocationContext/LocationContext";
import { Service } from "../../../types";

const FrameLogic = () => {
    const [searchResults, setSearchResults] = useState<Service[]>([]);
    const [page, setPage] = useState("landing");
    const { location, setLocation } = useContext(LocationContext);

    /* Sets app default values */
    const useHandleStartFunctions = () => {
        useEffect(() => {
            // Set session
            setSession();

            // Set location
            getLocalLocation().then((localLocation: any) => {
                setLocation({
                    lat: localLocation.lat,
                    lng: localLocation.lng,
                    distance: location.distance,
                });
            });
        }, []);
    };

    return {
        searchResults,
        setSearchResults,
        page,
        setPage,
        useHandleStartFunctions,
    };
};

export default FrameLogic;
