// Imports
import axios from "axios";
// Types
import { SearchBody, SimilarBody, FeedbackBody, GeoSearchBody } from "../types";

export const getSimilar = async (similarBody: SimilarBody, dataSource: any) => {
    try {
        const res = await axios.post(
            `/recommend`,
            {
                items: [`${similarBody.resourceId}`],
                lat: similarBody.lat,
                lng: similarBody.lng,
                distance: similarBody.distance,
                community_services: dataSource.includes("211") ? true : false,
                employment: dataSource.includes("Magnet") ? true : false,
                volunteer: dataSource.includes("Mentor") ? true : false,
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

export const getService = async (similarBody: SimilarBody, dataSource: any) => {
    try {
        const res = await axios.post(`/similar`, {
            item_id: `${similarBody.resourceId}`,
            lat: similarBody.lat,
            lng: similarBody.lng,
            distance: similarBody.distance,
            size: 1,
            community_services: dataSource.includes("211") ? true : false,
            employment: dataSource.includes("Magnet") ? true : false,
            volunteer: dataSource.includes("Mentor") ? true : false,
        });
        const data = await res.data;
        return data.items[0];
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
export const getGeoSearchResults = async (
    geoSearch: GeoSearchBody,
    dataSource: any
) => {
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
                community_services: dataSource.includes("211") ? true : false,
                employment: dataSource.includes("Magnet") ? true : false,
                volunteer: dataSource.includes("Mentor") ? true : false,
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
        const res = await axios.post("/feedback", {
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
export const setSession = async () => {
    let session = localStorage.getItem("session_token");
    // Check for first time on site
    try {
        if (!session) {
            const res = await axios.post("/session");
            const data = await res.data;
            localStorage.setItem("session_token", `${data.session_token}`);
        }
    } catch (err) {
        throw err;
    }
};

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

//Adds a selection
// export const addSelection = async (id: string) => {
//     try {
//         let session = localStorage.getItem("session_token");
//         if (session) {
//             const res = await axios.post(
//                 "/add_item",
//                 { item_id: id },
//                 {
//                     headers: {
//                         session_token: session,
//                     },
//                 }
//             );
//             const data = await res.data;
//             return data.items;
//         }
//     } catch (err) {
//         throw err;
//     }
// };
// export const removeSelection = async (id: string) => {
//     try {
//         let session = localStorage.getItem("session_token");
//         if (session) {
//             const res = await axios.post(
//                 "/remove_item",
//                 { item_id: id },
//                 {
//                     headers: {
//                         session_token: session,
//                     },
//                 }
//             );
//             const data = await res.data;
//             return data.items;
//         }
//     } catch (err) {
//         throw err;
//     }
// };
export const getSelections = async (search: any, dataSource: any) => {
    //Get selections with session id
    const payload = {
        items: search.historyLog,
        lat: search.location.lat,
        lng: search.location.lng,
        distance: search.distance,
        community_services: dataSource.includes("211") ? true : false,
        employment: dataSource.includes("Magnet") ? true : false,
        volunteer: dataSource.includes("Mentor") ? true : false,
    };
    try {
        const res = await axios.post("/recommend", payload);
        const data = await res.data;
        return data;
    } catch (err) {
        throw err;
    }
};
