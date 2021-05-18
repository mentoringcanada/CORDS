import React from "react";
import SearchBar from "../../SearchBar/SearchBar";
import { StyledCloseButton, StyledFrame } from "./Frame.styles";
import FrameLogic from "./Frame.logic";
import LocationBar from "../../LocationBar/LocationBar";
import ServicesOutput from "../../Services/ServicesOutput/ServicesOutput";

interface Props {
    setWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

// Body of Widget holding components
const Frame = ({ setWidget }: Props) => {
    const {
        location,
        setLocation,
        searchResults,
        setSearchResults,
        useHandleStartFunctions,
    } = FrameLogic();
    useHandleStartFunctions();

    return (
        <StyledFrame>
            <StyledCloseButton
                onClick={() => setWidget(false)}
                data-testid="close-button"
            >
                &minus;
            </StyledCloseButton>
            <SearchBar
                setSearchResults={setSearchResults}
                location={location}
            />
            <LocationBar location={location} setLocation={setLocation} />
            <ServicesOutput services={searchResults} location={location} />
        </StyledFrame>
    );
};

export default Frame;
