interface Service {
    id: number;
    name: string;
    link: string;
    description: string;
}

interface LongService {
    id: number;
    name: string;
    link: string;
    description: string;
    location: string;
    distance: string;
}

interface User {
    location: {
        lat: number | undefined;
        lng: number | undefined;
    };
}
