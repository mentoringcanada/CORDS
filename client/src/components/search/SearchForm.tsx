import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, createContext } from "react";
import SearchBar from "./SearchBar";
import SearchFilters from "./SearchFilters";
import { useQueryClient } from "react-query";

export const SearchContext = createContext<any>(null);

const distanceValues = [2, 5, 10, 25, 50, 100];

const SearchForm = () => {
	const router = useRouter();
	const form = useForm<SearchState>(),
		{ reset, handleSubmit } = form;
	const queryClient = useQueryClient();

	// searches based on form data
	const search = (data: Search) => {
		queryClient.resetQueries(["search"]);
		router.push({
			pathname: "/search",
			query: { ...router.query, ...data, page: 1 },
		});
	};

	// updates the search based on data (used for filters)
	const updateSearch = (data: Search) => {
		queryClient.resetQueries(["search"]);
		router.push(
			{
				query: { ...router.query, ...data, page: 1 },
			},
			undefined,
			{ shallow: true }
		);
	};

	useEffect(() => {
		if (router.isReady) {
			let form: any = router.query;
			!distanceValues.includes(Number(form.distance)) &&
				(form.distance = 100);
			form.community_services = form.community_services != "false";
			form.employment = form.employment != "false";
			form.volunteer = form.volunteer != "false";
			reset(form);
		}
	}, [router.isReady, reset]);

	return (
		<SearchContext.Provider value={{ updateSearch }}>
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
