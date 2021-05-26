import { useEffect } from "react";

const AppLogic = () => {
    const useStartupEffect = () => {
        useEffect(() => {
            // Calls link out on page close
            // window.onbeforeunload = linkOut;
        }, []);
    };

    return { useStartupEffect };
};

export default AppLogic;
