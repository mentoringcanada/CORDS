import { useContext, useEffect, useRef, useState } from "react";
import LanguageContext from "../../../../../helper/LanguageContext";
import { Service } from "../../../../../types";

const ServicesListLogic = (handleServices: (page: number) => void) => {
    const { language } = useContext(LanguageContext);
    const [page, setPage] = useState(1);

    const getName = (service: Service) => {
        let name =
            language === "fr-CA" && service.nom !== ""
                ? service.nom
                : service.name;

        name = name.replace(/[\u{0080}-\u{FFFF}]/gu, "");
        return name;
    };

    const getDescription = (service: Service) => {
        let desc =
            language === "fr-CA" && service.description_fr !== ""
                ? service.description_fr
                : service.description;

        desc = desc.replace(/[\u{0080}-\u{FFFF}]/gu, "");
        return desc;
    };

    const resetScrollEffect = (
        ref: React.MutableRefObject<HTMLDivElement | null>
    ) => {
        if (ref.current) ref.current.scrollTop = 0;
    };

    const useOnPageChange = (
        page: number,
        outputRef: React.MutableRefObject<any> | undefined
    ) => {
        const didMount = useRef(false);

        useEffect(() => {
            if (didMount.current) {
                outputRef
                    ? resetScrollEffect(outputRef)
                    : window.scrollTo(0, 0);
                handleServices(page);
            } else didMount.current = true;
        }, [page, outputRef]);
    };

    return {
        page,
        setPage,
        getName,
        getDescription,
        useOnPageChange,
    };
};
export default ServicesListLogic;
