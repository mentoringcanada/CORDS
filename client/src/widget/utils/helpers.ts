// Imports
import axios from "axios";

// Takes id and returns similar results array
export const getSimilar = async (id: number) => {
    const res = await axios.get(`/similar/${id}`, {
        headers: {
            session_token: `${localStorage.getItem("session_token")}`,
        },
    });
    const data = await res.data;
    return data.items;
};

// Takes Search and returns results array
export const getResults = async (searchBody: SearchBody) => {
    const res = await axios.post(
        "/search",
        {
            query: searchBody.search,
            lat: searchBody.lat,
            long: searchBody.lng,
        },
        {
            headers: {
                session_token: `${localStorage.getItem("session_token")}`,
            },
        }
    );
    const data = await res.data;
    return data.items;
};

// Sets Session token if there isn't one
export const setSession = async () => {
    let session = localStorage.getItem("session_token");
    // Check for first time on site
    if (!session) {
        const res = await axios.get("/session");
        const data = await res.data;
        localStorage.setItem("session_token", `${data.session_token}`);
    }
};

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
