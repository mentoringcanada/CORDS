import axios from "axios";
import { useQuery } from "react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import SearchBar from "../components/search/SearchForm";
import Service from "../components/search/Service";
import Spinner from "../components/common/Spinner";
import Pagination from "src/components/search/Pagination";
import Image from "next/image";
import NoResults from "public/no-results.svg";
import PreResults from "public/pre-results.svg";
import useTranslation from "next-translate/useTranslation";

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
	const { t } = useTranslation();
	const { query } = useRouter();
	const { isLoading, isError, error, data } = useQuery<SearchResult, Error>(
		["search", query],
		() => getServices(query),
		{
			refetchOnWindowFocus: false,
			enabled:
				!!query.q &&
				!!query.loc &&
				!!query.lat &&
				!!query.lng &&
				(!!query.community_services ||
					!!query.volunteer ||
					!!query.employment),
		}
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
			{data ? (
				data.totalResults === 0 ? (
					<div className="m-auto mt-10 md:mt-20 flex items-center flex-col transition">
						<Image
							src={NoResults}
							alt="No results image"
							width={150}
							height={150}
						/>
						<h3 className="font-bold text-xl opacity-80 text-center mt-6">
							No Results Found!
						</h3>
						<p className="opacity-50 w-fit mt-4">
							Try a new search or change search options...
						</p>
					</div>
				) : (
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
				)
			) : (
				!isError &&
				!isLoading && (
					<div className="m-auto mt-10 md:mt-20 flex items-center flex-col transition">
						<Image
							src={PreResults}
							alt="Pre results image"
							width={150}
							height={150}
						/>
						<h3 className="font-bold text-xl opacity-80 text-center mt-6">
							{t("search:presearch-text")}
						</h3>
					</div>
				)
			)}
		</section>
	);
};

export default SearchPage;
