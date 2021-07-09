// Imports
import axios from "axios";
// Types
import { SearchBody, SimilarBody, FeedbackBody, GeoSearchBody } from "../types";
import { serviceRes } from "./testData";

// SEARCH //
// Takes id and returns similar results array
export const getSimilar = async (similarBody: SimilarBody) => {
    try {
        const res = await axios.post(
            `/similar`,
            {
                item_id: similarBody.resourceId,
                lat: similarBody.lat
                    ? Number(similarBody.lat.toFixed(4))
                    : 43.6532,
                lng: similarBody.lng
                    ? Number(similarBody.lng.toFixed(4))
                    : -79.3832,
                distance: similarBody.distance,
                page: similarBody.page,
            },
            {
                headers: {
                    session_token: `${localStorage.getItem("session_token")}`,
                },
            }
        );
        const data = await res.data;
        return data;
    } catch (err) {
        throw err;
    }
};

export const getService = async (similarBody: SimilarBody) => {
    try {
        const res = await axios.post(
            `/similar`,
            {
                item_id: similarBody.resourceId,
                lat: similarBody.lat
                    ? Number(similarBody.lat.toFixed(4))
                    : 43.6532,
                lng: similarBody.lng
                    ? Number(similarBody.lng.toFixed(4))
                    : -79.3832,
                distance: similarBody.distance,
                page: 1,
            },
            {
                headers: {
                    session_token: `${localStorage.getItem("session_token")}`,
                },
            }
        );
        const data = await res.data.items[0];
        return data;
    } catch (err) {
        throw err;
    }
};
// Takes Search and returns results array
export const getSearchResults = async (searchBody: SearchBody) => {
    try {
        const res = await axios.post(
            "/search",
            {
                query: searchBody.query,
                page: searchBody.page,
            },
            {
                headers: {
                    session_token: `${localStorage.getItem("session_token")}`,
                },
            }
        );
        const data = await res.data;
        return data;
    } catch (err) {
        throw err;
    }
};
export const getGeoSearchResults = async (geoSearch: GeoSearchBody) => {
    try {
        const res = await axios.post(
            "/geosearch",
            {
                query: geoSearch.query || "",
                lat: geoSearch.lat ? Number(geoSearch.lat.toFixed(6)) : 43.6532,
                lng: geoSearch.lng
                    ? Number(geoSearch.lng.toFixed(6))
                    : -79.3832,
                distance: geoSearch.distance,
                page: geoSearch.page,
            },
            {
                headers: {
                    session_token: `${localStorage.getItem("session_token")}`,
                },
            }
        );
        const data = res.data;
        return data;
    } catch (err) {
        throw err;
    }
};

export const sendFeedback = async (feedbackBody: FeedbackBody) => {
    try {
        const res = await axios.post("/feeback", {
            query: feedbackBody.query,
            item_id: feedbackBody.item_id,
            sortOrder: feedbackBody.sortOrder,
            msg: feedbackBody.msg,
            type: feedbackBody.type,
        });
        const data = await res.data;
        return data;
    } catch (err) {
        throw err;
    }
};

export const getLocalLocation = async () => {
    return await new Promise((res) => {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    const localLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    res(localLocation);
                },
                (error) => {
                    console.log(`Location error: ${error.message}`);
                },
                { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
            );
        }
    });
};

// CLUSTERS
export const getTaxonomies = async () => {
    const res = await axios.get("/taxonomies");
    const data = await res.data;
    return data;
};

export const getClusters = async () => {
    const res = await axios.get("/clusters");
    const data = await res.data;
    return data;
};

export const getCluster = async (id: number) => {
    const res = await axios.get(`/cluster?clusterId=${id}`);
    const data = await res.data;
    return data;
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
export const getSelections = async (page: number) => {
    return serviceRes.data.items;
    // Get selections with session id
    // TODO: send page number
    // try {
    //     let session = localStorage.getItem("session_token");
    //     if (session) {
    //         const res = await axios.get("/selections",:w
    //          {
    //             headers: {
    //                 session_token: session,
    //             },
    //         });
    //         const data = await res.data;
    //         return data;
    //     }
    // } catch (err) {
    //     throw err;
    // }
};
