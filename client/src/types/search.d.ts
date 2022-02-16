interface Search {
	query?: string;
	lat?: number;
	lng?: number;
	distance?: number;
	page?: number;
	community_services?: bool;
	employment?: bool;
	volunteer?: bool;
}
interface SearchState {
	q?: string;
	loc?: string;
	lat?: number;
	lng?: number;
	distance?: number;
	page?: number;
	community_services?: bool;
	employment?: bool;
	volunteer?: bool;
}

interface SearchResult {
	items: Service[];
	totalResults: number;
}
