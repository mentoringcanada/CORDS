import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { QueryClient, dehydrate, useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../../components/common/Spinner";
import Similar from "src/components/service/Similar";
import Map from "src/components/service/Map";

const getService = async (item_id: any) => {
	const res = await axios.post(`/similar`, {
		item_id,
		page: 1,
		size: 1,
		lat: 43.6532,
		lng: -79.3832,
		distance: 100,
		community_services: true,
		volunteer: true,
		employment: true,
	});
	return await res.data.items[0];
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(["service", params?.item_id], () =>
		getService(params?.item_id)
	);

	return {
		props: { dehydratedState: dehydrate(queryClient) },
		revalidate: 60,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [
		{
			params: {
				item_id: "73446751",
			},
		},
	];
	return { paths, fallback: "blocking" };
};

const ServicePage: NextPage = () => {
	const router = useRouter(),
		{ query, locale } = router;
	const { isLoading, isError, error, data } = useQuery<Service, Error>(
		["service", query.item_id],
		() => getService(query.item_id),
		{ refetchOnWindowFocus: false, enabled: !!query.item_id }
	);

	return (
		<>
			<div className="border-[1px] border-outline border-opacity-50 rounded shadow-lg flex flex-col md:flex-row-reverse">
				{isLoading && <Spinner />}
				{isError && error && <p>{error.message}</p>}
				{data && (
					<>
						<Map lat={data.lat} lng={data.lng} />
						<section className="flex-grow-[2] p-4">
							<h1 className="text-2xl font-semibold mb-2">
								{data.name}
							</h1>
							<p>{data.address}</p>
							<p
								className="opacity-70 my-4"
								dangerouslySetInnerHTML={{
									__html: data.description,
								}}
							></p>
							{data.phone && (
								<>
									<h3 className="text-md font-semibold mb-1">
										Contact
									</h3>
									<p>{data.phone}</p>
								</>
							)}
						</section>
					</>
				)}
			</div>
			<Similar
				lat={Number(query.lat || (data && data.lat))}
				lng={Number(query.lng || (data && data.lng))}
			/>
		</>
	);
};

export default ServicePage;
