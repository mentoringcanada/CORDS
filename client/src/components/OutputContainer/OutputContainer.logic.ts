import React, { useEffect, useRef } from "react";

const OutputContainerLogic = () => {
    const outputRef = useRef(null);

    const resetScrollEffect = (
        ref: React.MutableRefObject<null | HTMLDivElement>
    ) => {
        if (ref.current) ref.current.scrollTop = 0;
    };

    const useScrollEffect = (children: React.ReactNode) => {
        useEffect(() => {
            resetScrollEffect(outputRef);
        }, [children]);
    };

    return { outputRef, useScrollEffect };
};
export default OutputContainerLogic;
