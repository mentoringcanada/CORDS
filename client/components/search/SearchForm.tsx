import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchFilters from "./SearchFilters";

const SearchForm = () => {
	const router = useRouter();
	const form = useForm<Search>(),
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
		if (router.query) reset(router.query);
	}, [router.query, reset]);

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(search)} className="flex flex-col">
				<SearchBar />
				<SearchFilters search={search} />
			</form>
		</FormProvider>
	);
};

export default SearchForm;
