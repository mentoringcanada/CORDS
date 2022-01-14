import axios from "axios";
import { useQuery } from "react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import SearchBar from "../components/search/SearchBar";
import Service from "../components/search/Service";
import Spinner from "../components/common/Spinner";
import Pagination from "components/search/Pagination";

const getServices = async ({
	q = "",
	lat = 43.6532,
	lng = -79.3832,
	distance = 100,
	page = 1,
}: any) => {
	const res = await axios.post("https://server.cordsconnect.ca/geosearch", {
		query: q,
		lat,
		lng,
		distance,
		page,
	});
	return await res.data;
};

const Search: NextPage = () => {
	const { query } = useRouter();
	const { isLoading, isError, error, data } = useQuery<any, Error>(
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
						{data.items.map((service: any) => {
							return (
								<Service
									key={service.item_id}
									item_id={service.item_id}
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

export default Search;