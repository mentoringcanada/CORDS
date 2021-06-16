import { useContext, useEffect, useState } from "react";
import { Service } from "../../../../types";
import SearchContext from "../../SearchContext";

const ServiceOutputLogic = () => {
    const { search } = useContext(SearchContext);
    const [focus, setFocus] = useState<number | null>(null);

    const resetScrollEffect = (
        ref: React.MutableRefObject<HTMLDivElement | null>
    ) => {
        if (ref.current) ref.current.scrollTop = 0;
    };

    const useOnFocusOrPageChange = (
        focus: number | null,
        page: number,
        outputRef: React.MutableRefObject<any> | undefined
    ) => {
        useEffect(() => {
            outputRef ? resetScrollEffect(outputRef) : window.scrollTo(0, 0);
        }, [focus, page, outputRef]);
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

    const getServices = (filter: string) => {
        if (filter === "proximity") {
            return search.services
                .concat()
                .sort((a: any, b: any) => a.distance - b.distance);
        } else {
            return search.services;
        }
    };

    return {
        search,
        focus,
        setFocus,
        useOnServicesChange,
        useOnFocusOrPageChange,
        getServices,
    };
};

export default ServiceOutputLogic;
