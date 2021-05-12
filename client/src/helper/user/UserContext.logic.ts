// LOCATION //
// Gets and Returns Location (lat, lng)
export const getLocation = () => {
    return new Promise((res) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            res(location);
        });
    });
};
