import { useEffect, useState } from "react";
import { getSimilar } from "../../../helper/api";
import { Service } from "../../../types";

const LargeServiceLogic = () => {
    const [similar, setSimilar] = useState<Service[]>([]);
    const [service, setService] = useState<Service | null>(null);

    const useSetState = (id: number) => {
        useEffect(() => {
            // Gets service data on component startup
            getSimilar(id).then((res) => {
                setService(res[0]);
                setSimilar(res.slice(1));
            });
        }, [id]);
    };

    return { similar, service, useSetState };
};

export default LargeServiceLogic;
