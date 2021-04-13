// Imports
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

// Components
import OutputBox from "./OutputBox";
import SearchBar from "../search/SearchBar";
import LocationBox from "../search/LocationBox";
import UserContext from "../user/UserContext";

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
    const [services, setServices] = useState<Service[] | null>(null);
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        // Get location
        navigator.geolocation.getCurrentPosition((position) => {
            setUser({
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
            });
        });
        // Get session
    }, []);

    return (
        <StyledFrame>
            <SearchBar setServices={setServices} />
            <button className="close-button" onClick={() => setWidget(false)}>
                &minus;
            </button>
            <LocationBox />
            <OutputBox services={services} />
        </StyledFrame>
    );
};

export default Frame;
