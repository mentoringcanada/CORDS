interface Service {
    name: string;
    item_id: string;
    lat: number;
    lng: number;
    address: string;
    // link: string;
    description: string;
}

interface User {
    location: {
        lat: number | undefined;
        lng: number | undefined;
    };
}
