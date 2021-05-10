// Imports
import React, { useEffect } from "react";

// Props
interface Props {
    children: React.ReactNode;
    handleClickOutside: (e: any) => void;
}

//
const DropdownBox = ({ handleClickOutside, children }: Props) => {
    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    return <div>{children}</div>;
};

export default DropdownBox;
