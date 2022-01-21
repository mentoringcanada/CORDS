import axios from "axios";
import { useQuery } from "react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import SearchBar from "../components/search/SearchForm";
import Service from "../components/search/Service";
import Spinner from "../components/common/Spinner";
import Pagination from "src/components/search/Pagination";

const getServices = async ({
	q = "",
	lat = 43.6532,
	lng = -79.3832,
	distance = 100,
	community_services = true,
	volunteer = true,
	employment = true,
	page = 1,
}: any) => {
	const res = await axios.post("/geosearch", {
		query: q,
		lat,
		lng,
		distance,
		community_services,
		volunteer,
		employment,
		page,
	});
	return await res.data;
};

const SearchPage: NextPage = () => {
	const { query } = useRouter();
	const { isLoading, isError, error, data } = useQuery<SearchResult, Error>(
		["search", query],
		() => getServices(query),
		{ refetchOnWindowFocus: false, enabled: !!query.q }
	);

	return (
		<section className="my-12">
			<SearchBar />
			{isLoading && (
				<div className="mt-20">
					<Spinner />
				</div>
			)}
			{isError && error && <p>{error.message}</p>}
			{data && (
				<>
					<section className="flex flex-col md:max-w-[70%]">
						<p className="opacity-50 mt-4">
							{data.totalResults} total results
						</p>
						{data.items.map((service: Service) => {
							return (
								<Service
									key={service.item_id}
									item_id={Number(service.item_id)}
									name={service.name}
									distance={service.distance}
									description={service.description}
								/>
							);
						})}
					</section>
					{query.page && (
						<Pagination
							page={Number(query.page)}
							pageCount={Math.ceil(data.totalResults / 10)}
						/>
					)}
				</>
			)}
		</section>
	);
};

export default SearchPage;
