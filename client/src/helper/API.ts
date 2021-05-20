// Imports
import axios from "axios";
// Types
import { SearchBody, GeoSearchBody, SimilarBody } from "../types";

// SEARCH //
// Takes id and returns similar results array
export const getSimilar = async (similarBody: SimilarBody) => {
    const res = await axios.post(
        `/similar`,
        {
            item_id: similarBody.resourceId,
            lat: similarBody.lat ? Number(similarBody.lat.toFixed(4)) : 43.6532,
            lng: similarBody.lng
                ? Number(similarBody.lng.toFixed(4))
                : -79.3832,
        },
        {
            headers: {
                session_token: `${localStorage.getItem("session_token")}`,
            },
        }
    );
    // const res = await axios.get(`/similar/${similarBody.resourceId}`, {
    //     headers: {
    //         session_token: `${localStorage.getItem("session_token")}`,
    //     },
    // });
    const data = await res.data;
    return data.items;
};
// Takes Search and returns results array
export const getSearchResults = async (searchBody: SearchBody) => {
    const res = await axios.post(
        "/search",
        {
            query: searchBody.search,
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
export const getGeoSearchResults = async (geoSearchBody: GeoSearchBody) => {
    const res = await axios.post(
        "/geosearch",
        {
            query: geoSearchBody.search || "",
            lat: geoSearchBody.location.lat
                ? Number(geoSearchBody.location.lat.toFixed(4))
                : 43.6532,
            lng: geoSearchBody.location.lng
                ? Number(geoSearchBody.location.lng.toFixed(4))
                : -79.3832,
            distance: geoSearchBody.distance || 100,
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

export const getLocalLocation = async () => {
    return await new Promise((res) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const localLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    res(localLocation);
                },
                (error) => {
                    console.log(`Location error: ${error.code}`);
                }
            );
        }
    });
};

// SESSION //
// Sets Session token if there isn't one
// export const setSession = async () => {
//     let session = localStorage.getItem("session_token");
//     // Check for first time on site
//     if (!session) {
//         const res = await axios.get("/session");
//         const data = await res.data;
//         localStorage.setItem("session_token", `${data.session_token}`);
//     }
// };

// LINK OUT //
// Runs ('/link_out') if session exists
// export const linkOut = async (e: BeforeUnloadEvent) => {
//     e.preventDefault();
//     const session = localStorage.getItem("session_token");

//     if (session) {
//         fetch("http://cordsconnect.ca:8000/link_out", {
//             method: "post",
//             keepalive: true,
//             body: JSON.stringify({ item_id: "" }),
//             headers: {
//                 session_token: session,
//                 "Content-Type": "application/json",
//             },
//         });
//     }
// };

// SELECTIONS - TODO //

// Adds a selection
// export const addSelection = (id: string) => {
//     return "temp add";
// };
// export const removeSelection = (id: string) => {
//     return "temp remove";
// };
// export const getSelections = async () => {
//     let session = localStorage.getItem("session_token");
//     // Get selections with session id
//     if (session) {
//         const res = await axios.get("/selections", {
//             headers: {
//                 session_token: session,
//             },
//         });
//         const data = await res.data;
//         return data;
//     }
// };
