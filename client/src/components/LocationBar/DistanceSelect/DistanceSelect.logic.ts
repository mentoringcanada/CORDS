import { useContext } from "react";
import LocationContext from "../../../helper/LocationContext/LocationContext";

const DistanceSelectLogic = () => {
    const { location, setLocation } = useContext(LocationContext);

    const handleDistanceChange = (distanceValue: any) => {
        setLocation({
            lat: location.lat,
            lng: location.lng,
            distance: distanceValue.value,
        });
    };

    const distanceSelectOptions = [
        { value: 1, label: "1km" },
        { value: 3, label: "3km" },
        { value: 5, label: "5km" },
        { value: 10, label: "10km" },
        { value: 20, label: "20km" },
        { value: 50, label: "50km" },
    ];

    return {
        handleDistanceChange,
        distanceSelectOptions,
    };
};

export default DistanceSelectLogic;
