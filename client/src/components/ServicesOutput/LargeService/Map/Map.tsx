import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

interface Props {
    lat: number;
    lng: number;
}

const Map = ({ lat, lng }: Props) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "YOUR_API_KEY",
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    const containerStyle = {
        minWidth: "15rem",
        height: "15rem",
    };

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
                lat: lat,
                lng: lng,
            }}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={{ lat, lng }} />
        </GoogleMap>
    );
};

export default Map;
