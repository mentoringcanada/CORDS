export interface Service {
    item_id: string;
    name: string;
    description: string;
    lat: number;
    lng: number;
    address: string;
    distance: number;
    link: string;
}

export interface Location {
    lat: number | undefined;
    lng: number | undefined;
    distance: number | undefined;
}

export interface SearchBody {
    search: string;
}
export interface GeoSearchBody {
    search: string;
    lat: number;
    lng: number;
    distance: number;
}
