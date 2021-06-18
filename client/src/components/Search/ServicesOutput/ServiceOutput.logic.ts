import { useContext, useEffect, useState } from "react";
import { Service } from "../../../types";
import SearchContext from "../SearchContext";
import { resetScroll } from "../../../helper/Services";

const ServiceOutputLogic = () => {
    const { search } = useContext(SearchContext);
    const [focus, setFocus] = useState<number | null>(null);
    const [page, setPage] = useState(1);

    const useOnFocusChange = (
        focus: number | null,
        outputRef: React.MutableRefObject<any> | undefined
    ) => {
        useEffect(() => {
            outputRef ? resetScroll(outputRef) : window.scrollTo(0, 0);
        }, [focus, outputRef]);
    };

    const useOnServicesChange = (
        services: Service[],
        outputRef: React.MutableRefObject<any> | undefined
    ) => {
        useEffect(() => {
            setFocus(null);
            outputRef ? resetScroll(outputRef) : window.scrollTo(0, 0);
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
        page,
        setPage,
        search,
        focus,
        setFocus,
        useOnServicesChange,
        useOnFocusChange,
        getServices,
    };
};

export default ServiceOutputLogic;
