import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { QueryClient, dehydrate, useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../../components/common/Spinner";
import Service from "src/components/search/Service";

const getService = async (item_id: any) => {
	const res = await axios.get(`/similar/${item_id}`);
	return res.data;
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
		{ query } = router;
	const { isLoading, isError, error, data } = useQuery<SimilarResult, Error>(
		["service", query.item_id],
		() => getService(query.item_id),
		{ refetchOnWindowFocus: false, enabled: !!query.item_id }
	);

	return (
		<>
			<div className="border-[1px] border-outline border-opacity-50 rounded shadow-lg p-4">
				{isLoading && <Spinner />}
				{isError && error && <p>{error.message}</p>}
				{data && data.items[0] && (
					<>
						<h1 className="text-2xl font-semibold mb-2">
							{data.items[0].name}
						</h1>
						<p>{data.items[0].address}</p>
						<p
							className="opacity-70 my-4"
							dangerouslySetInnerHTML={{
								__html: data.items[0].description,
							}}
						></p>
						{data.items[0].phone && (
							<>
								<h3 className="text-md font-semibold mb-1">
									Contact
								</h3>
								<p>{data.items[0].phone}</p>
							</>
						)}
						<section className="flex flex-col overflow-y-scroll max-h-64 overflow-x-hidden mt-8">
							{data.items.map(
								(service: Service, index: number) =>
									index !== 0 && (
										<Service
											key={service.item_id}
											item_id={Number(service.item_id)}
											name={service.name}
											distance={service.distance}
											description={service.description}
										/>
									)
							)}
						</section>
					</>
				)}
			</div>
		</>
	);
};

export default ServicePage;
