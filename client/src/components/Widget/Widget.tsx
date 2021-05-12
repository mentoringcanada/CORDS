import TriggerButton from "./TriggerButton/TriggerButton";
import Frame from "./Frame/Frame";
import { animated } from "react-spring";
import WidgetLogic from "./Widget.logic";

const Widget = () => {
    const { setWidget, transition } = WidgetLogic();

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
