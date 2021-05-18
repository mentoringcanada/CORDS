import { useEffect, useState } from "react";
import { Service } from "../../../types";

const ServiceOutputLogic = (services: Service[]) => {
    const [focus, setFocus] = useState<number | null>(null);

    const useOnServicesChange = () => {
        useEffect(() => {
            setFocus(null);
        }, [services]);
    };

    return { focus, setFocus, useOnServicesChange };
};

export default ServiceOutputLogic;
