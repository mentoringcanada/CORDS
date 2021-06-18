import { useContext, useEffect, useRef, useState } from "react";
import LanguageContext from "../../../../helper/LanguageContext";
import { resetScroll } from "../../../../helper/Services";

const ServicesListLogic = (handleServices: (page: number) => void) => {
    const { language } = useContext(LanguageContext);
    const [page, setPage] = useState(1);

    const useOnPageChange = (
        page: number,
        outputRef: React.MutableRefObject<any> | undefined
    ) => {
        const didMount = useRef(false);

        useEffect(() => {
            if (didMount.current) {
                outputRef ? resetScroll(outputRef) : window.scrollTo(0, 0);
                handleServices(page);
            } else didMount.current = true;
        }, [page, outputRef]);
    };

    return {
        language,
        page,
        setPage,
        useOnPageChange,
    };
};
export default ServicesListLogic;
