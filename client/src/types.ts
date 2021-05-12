export interface Service {
    name: string;
    item_id: string;
    lat: number;
    lng: number;
    address: string;
    link: string;
    description: string;
}

export interface User {
    location: {
        lat: number | undefined;
        lng: number | undefined;
    };
}

export interface SearchBody {
    search: string;
}
export interface GeoSearchBody {
    search: string;
    lat: number;
    lng: number;
    distance: number;
    page: number;
}
