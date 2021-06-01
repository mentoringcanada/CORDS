import { useEffect, useState } from "react";
import { Service } from "../../../types";

const ServiceOutputLogic = () => {
    const [focus, setFocus] = useState<number | null>(null);
    const [filterOption, setFilterOption] = useState("best");

    const handleFilterOption = (filter: any) => {
        setFilterOption(filter.value);
    };

    const resetScrollEffect = (
        ref: React.MutableRefObject<HTMLDivElement | null>
    ) => {
        if (ref.current) ref.current.scrollTop = 0;
    };

    const useOnFocusChange = (
        focus: number | null,
        outputRef: React.MutableRefObject<any> | undefined
    ) => {
        useEffect(() => {
            outputRef ? resetScrollEffect(outputRef) : window.scrollTo(0, 0);
        }, [focus, outputRef]);
    };

    const useOnServicesChange = (
        services: Service[],
        outputRef: React.MutableRefObject<any> | undefined
    ) => {
        useEffect(() => {
            setFocus(null);
            outputRef ? resetScrollEffect(outputRef) : window.scrollTo(0, 0);
        }, [services, outputRef]);
    };

    return {
        focus,
        setFocus,
        useOnServicesChange,
        useOnFocusChange,
        filterOption,
        handleFilterOption,
    };
};

export default ServiceOutputLogic;
