import { useEffect, useState } from "react";
import { getSimilar } from "../../../helper/API";
import { Location, Service, SimilarBody } from "../../../types";

const LargeServiceLogic = (
    location: Location,
    setSearchState?: React.Dispatch<React.SetStateAction<string>>
) => {
    const [similar, setSimilar] = useState<Service[]>([]);
    const [service, setService] = useState<Service | null>(null);

    const useSetState = (id: number) => {
        useEffect(() => {
            const similarBody: SimilarBody = {
                resourceId: id,
                lat: location.lat,
                lng: location.lng,
            };
            // Gets service data on component startup
            if (setSearchState !== undefined) setSearchState("searching");
            getSimilar(similarBody).then((res) => {
                console.log(res);
                if (setSearchState !== undefined) setSearchState("");
                setService(res[0]);
                setSimilar(res.slice(1));
            });
        }, [id]);
    };

    return { similar, service, useSetState };
};

export default LargeServiceLogic;
