// Imports
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

// Components
import UserContext from "../user/UserContext";
import Password from "../user/Password";

// Utils
import { getLocation, setSession } from "../utils/api";
import Search from "../pages/search/Search";
import Landing from "../pages/Landing";
import SearchBar from "../common/SearchBar";
import NavBar from "../common/NavBar";
import Selections from "../pages/Selections";

// Styling
const StyledFrame = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    padding: 0.8rem 0.5rem 0.5rem 0.5rem;
    width: 350px;
    height: 500px;
    border-radius: 10px;
    background-color: var(--primary-color);
    box-shadow: 2px 2px 5px grey;

    .close-button {
        font-size: 0.8rem;
        position: absolute;
        width: 1rem;
        height: 1rem;
        top: 0.25rem;
        right: 0.5rem;
        background-color: transparent;
    }
`;

// Props
interface Props {
    setWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

// Body of Widget holding components
const Frame = ({ setWidget }: Props) => {
    // Password
    const [auth, setAuth] = useState(false);
    const [results, setResults] = useState<Service[]>([]);
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

    return (
        <StyledFrame>
            <button className="close-button" onClick={() => setWidget(false)}>
                &minus;
            </button>
            <SearchBar setResults={setResults} setPage={setPage} />
            <NavBar setPage={setPage} />
            {page === "landing" && <Landing />}
            {page === "search" && <Search results={results} />}
            {page === "selections" && <Selections />}
        </StyledFrame>
    );
};

export default Frame;
