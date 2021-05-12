import { useEffect, useState } from "react";

const DropdownLogic = () => {
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);

    const toggleDropdownMenu = () => setShowDropdownMenu(!showDropdownMenu);

    const useClickAlert = (dropdownRef: React.RefObject<HTMLDivElement>) => {
        useEffect(() => {
            const handleClickOutside = (e: any) => {
                if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(e.target)
                ) {
                    setShowDropdownMenu(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [dropdownRef]);
    };

    return {
        showDropdownMenu,
        toggleDropdownMenu,
        useClickAlert,
    };
};

export default DropdownLogic;
