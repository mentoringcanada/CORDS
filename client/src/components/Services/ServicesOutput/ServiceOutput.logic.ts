import { useEffect, useRef, useState } from "react";
import { Service } from "../../../types";

const ServiceOutputLogic = () => {
    const [focus, setFocus] = useState<number | null>(null);
    const outputRef = useRef(null);

    const resetScrollEffect = (
        ref: React.MutableRefObject<HTMLDivElement | null>
    ) => {
        if (ref.current) ref.current.scrollTop = 0;
    };

    const useOnFocusChange = (focus: number | null) => {
        useEffect(() => {
            resetScrollEffect(outputRef);
        }, [focus]);
    };

    const useOnServicesChange = (services: Service[]) => {
        useEffect(() => {
            setFocus(null);
            resetScrollEffect(outputRef);
        }, [services]);
    };

    return {
        outputRef,
        focus,
        setFocus,
        useOnServicesChange,
        useOnFocusChange,
    };
};

export default ServiceOutputLogic;
