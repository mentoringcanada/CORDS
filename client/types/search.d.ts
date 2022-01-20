interface Search {
	query?: string;
	lat?: number;
	lng?: number;
	loc?: string;
	distance?: number;
	page?: number;
}
interface SearchResult {
	items: Service[];
	totalResults: number;
}
