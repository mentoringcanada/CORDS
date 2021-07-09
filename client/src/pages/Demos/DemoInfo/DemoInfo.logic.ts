import { useState } from "react";

const DemoInfoLogic = () => {
    const [open, setOpen] = useState(false);

    return { open, setOpen };
};

export default DemoInfoLogic;
