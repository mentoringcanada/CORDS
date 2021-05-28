import { useState } from "react";

const DemoInfoLogic = () => {
    const [open, setOpen] = useState(true);

    return { open, setOpen };
};

export default DemoInfoLogic;
