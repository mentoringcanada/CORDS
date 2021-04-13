// Imports
import React, { useState } from "react";
import TriggerButton from "./TriggerButton";
import Frame from "./containers/Frame";
import { useTransition, animated } from "react-spring";

const Widget = () => {
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

    return transition((style, item) => (
        <animated.div style={style}>
            {item ? (
                <Frame setWidget={setWidget} />
            ) : (
                <TriggerButton setWidget={setWidget} />
            )}
        </animated.div>
    ));
};

export default Widget;
