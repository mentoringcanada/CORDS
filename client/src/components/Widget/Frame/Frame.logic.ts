import { useContext, useEffect, useState } from "react";
import { getLocation, setSession } from "../../../helper/api";
import UserContext from "../../../helper/user/UserContext";
import { Service } from "../../../types";

const FrameLogic = () => {
    const [searchResults, setSearchResults] = useState<Service[]>([]);
    const [page, setPage] = useState("landing");
    const { setUser } = useContext(UserContext);

    /* Sets app default values */
    useEffect(() => {
        // Set session
        setSession();

        // Set location
        getLocation().then((location: any) => {
            setUser({ location });
        });
    }, []);

    return { searchResults, setSearchResults, page, setPage, setUser };
};

export default FrameLogic;
