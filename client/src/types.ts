export interface Service {
    name: string;
    nom: string;
    item_id: string;
    lat: number;
    lng: number;
    address: string;
    link: string;
    description: string;
    description_fr: string;
    distance: number;
    phone: string;
}

export interface Location {
    lat: number | undefined;
    lng: number | undefined;
    distance?: number | undefined;
}

export interface SearchBody {
    query: string;
    page: number;
}
export interface GeoSearchBody {
    query: string;
    lat: Location["lat"];
    lng: Location["lng"];
    distance: number;
    page: number;
}
export interface SimilarBody {
    resourceId: number;
    lat: number | undefined;
    lng: number | undefined;
    distance: number;
    page: number;
}

export interface Search {
    query: string;
    distance: number;
    filter: string;
    state: string;
    location: Location;
}

export interface Demos {
    route: string;
    name: string;
    description: string;
}

export interface NavLink {
    linkName: string;
    route: string;
}

export interface FeedbackBody {
    item_id: number;
    query: string;
    sortOrder: string;
    msg: string;
    type: string;
}
