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
    search: string;
}
export interface GeoSearchBody {
    search: string;
    location: Location;
    distance: number;
}
export interface SimilarBody {
    resourceId: number;
    lat: number | undefined;
    lng: number | undefined;
}

export interface SearchResults {
    services: Service[];
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
