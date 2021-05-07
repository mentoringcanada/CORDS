// Imports
import React, { useState } from "react";
import PopUp from "./PopUp";

const StartScreen = () => {
    const [allowUse, setAllowUse] = useState(false);
    return <>{!allowUse && <PopUp setAllowUse={setAllowUse} />}</>;
};

export default StartScreen;
