import { useContext, useEffect, useRef } from "react";
import LanguageContext from "../../../../helper/LanguageContext";
import { resetScroll } from "../../../../helper/Services";

const ServicesListLogic = (handleServices: (page: number) => void) => {
    const { language } = useContext(LanguageContext);

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
        useOnPageChange,
    };
};
export default ServicesListLogic;
