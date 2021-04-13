// Imports
// import axios from "axios";
import tempData from "./tempData";

// Takes id and returns similar results array
export const getSimilar = async (id: number) => {
    // const res = await axios.get(`/similar/${id}`);
    // const data = await res.data;
    const data = tempData;
    return data.items;
};

// Takes Search and returns results array
export const getResults = async (search: string) => {
    // Request
    // const res = await axios.post(`/search`, {
    //     query: search,
    //     // lat: 0,
    //     // long: 0,
    // });
    // const data = await res.data;
    const data = tempData;
    return data.items;
};
