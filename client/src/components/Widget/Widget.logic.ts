import { useState } from "react";
import { useTransition } from "react-spring";

const WidgetLogic = () => {
    // Determines if widget is open or not (Default: closed)
    const [widget, setWidget] = useState(false);

    // Animation
    const transition = useTransition(widget, {
        config: {
            duration: 150,
        },
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        trail: 60,
    });

    return { setWidget, transition };
};

export default WidgetLogic;
