import { GetStaticPaths, GetStaticProps } from "next";
import { QueryClient, dehydrate, useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../../components/common/Spinner";

const getService = async (item_id: any) => {
	const res = await axios.get(
		`https://server.cordsconnect.ca/similar/${item_id}`
	);
	return res.data;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery("service", () =>
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

const Service = () => {
	const { query } = useRouter();
	const { isLoading, isError, error, data } = useQuery("service", () =>
		getService(query.item_id)
	);
	const { name, phone, address, description, resource_type }: Service =
		data.items[0];

	return (
		<div className="border-[1px] border-outline border-opacity-50 rounded shadow-lg p-4">
			{isLoading && <Spinner />}
			<h1>{name}</h1>
			<p>{phone}</p>
			<p>{address}</p>
			<p>{description}</p>
			<p>{resource_type}</p>
		</div>
	);
};

export default Service;
