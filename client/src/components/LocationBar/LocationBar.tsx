import DistanceSelect from "./DistanceSelect/DistanceSelect";
import { StyledLocationBar } from "./LocationBar.styles";
import LocationSelect from "./LocationSelect/LocationSelect";

const LocationBar = () => {
    return (
        <StyledLocationBar>
            <LocationSelect />
            <DistanceSelect />
        </StyledLocationBar>
    );
};

export default LocationBar;
