// Imports
import axios from "axios";

// SEARCH //
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

// SESSION //
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

// LINK OUT //
// Runs ('/link_out') if session exists
export const linkOut = async (e: BeforeUnloadEvent) => {
    e.preventDefault();
    const session = localStorage.getItem("session_token");

    if (session) {
        fetch("http://cordsconnect.ca:8000/link_out", {
            method: "post",
            keepalive: true,
            body: JSON.stringify({ item_id: "" }),
            headers: {
                session_token: session,
                "Content-Type": "application/json",
            },
        });
    }
};

// SELECTIONS - TODO //

// Adds a selection
export const addSelection = (id: string) => {
    return "temp add";
};
export const removeSelection = (id: string) => {
    return "temp remove";
};
export const getSelections = () => {
    return "list of selections";
};
