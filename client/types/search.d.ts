interface search {
	query: string;
	lat: number;
	lng: number;
	distance: number;
}

interface searchResult {
	items: Service[];
	totalResults: number;
}
