import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, createContext } from "react";
import SearchBar from "./SearchBar";
import SearchFilters from "./SearchFilters";

export const SearchContext = createContext<any>(null);

const distanceValues = [2, 5, 10, 25, 50, 100];

const SearchForm = () => {
	const router = useRouter();
	const form = useForm<SearchState>(),
		{ reset, handleSubmit } = form;

	// Updates the search based on data
	const search = (data: Search) => {
		router.push(
			{
				pathname: "/search",
				query: { ...router.query, ...data, page: 1 },
			},
			undefined,
			{ shallow: true }
		);
	};

	// Sets defaults from url query params
	useEffect(() => {
		if (router.query) {
			let form: any = router.query;
			!distanceValues.includes(Number(form.distance)) &&
				(form.distance = 100);
			form.community_services = form.community_services != "false";
			form.employment = form.employment != "false";
			form.volunteer = form.volunteer != "false";
			reset(router.query);
		}
	}, [router.query, reset]);

	return (
		<SearchContext.Provider value={{ search }}>
			<FormProvider {...form}>
				<form onSubmit={handleSubmit(search)} className="flex flex-col">
					<SearchBar />
					{router.pathname == "/search" && <SearchFilters />}
				</form>
			</FormProvider>
		</SearchContext.Provider>
	);
};

export default SearchForm;
