import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Marker = () => (
    <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
        <FaMapMarkerAlt style={{ width: "1.3rem", height: "1.3rem" }} />
    </div>
);

const Map = ({ lat, lng }) => {
    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
            }}
            center={{ lat, lng }}
            zoom={17}
        >
            <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
    );
};

export default Map;
