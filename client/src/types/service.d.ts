enum Provider {
	211,
	Magnet,
	Mentor,
}

interface Service {
	name: string;
	nom: string;
	item_id: string;
	lat: number;
	lng: number;
	distance: number;
	address: string;
	link: string;
	description: string;
	description_fr: string;
	distance: number;
	phone: string;
	address: string;
	description: string;
	lat: number;
	clusterId: number;
	resource_type: Provider;
}
