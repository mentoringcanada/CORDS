// LOCATION //
// Gets and Returns Location (lat, lng)
export const getLocalLocation = () => {
    return new Promise((res) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const localLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            res(localLocation);
        });
    });
};
