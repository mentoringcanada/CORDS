import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import Spinner from "../common/Spinner";
import ServiceItem from "../common/ServiceItem";
import useTranslation from "next-translate/useTranslation";

const getSimilar = async ({
	item_id,
	lat = 43.6532,
	lng = -79.3832,
	distance = 100,
	community_services = true,
	volunteer = true,
	employment = true,
}: any) => {
	const res = await axios.post("/recommend", {
		items: [item_id],
		lat,
		lng,
		distance,
		community_services,
		volunteer,
		employment,
	});
	return await res.data;
};

type Props = {
	lat?: number;
	lng?: number;
};

const Similar = ({ lat, lng }: Props) => {
	const { query } = useRouter();
	const { t } = useTranslation();
	const { isLoading, isError, data } = useQuery<SimilarResult, Error>(
		["similar", { ...query, lat, lng }],
		() => getSimilar({ ...query, lat, lng }),
		{ refetchOnWindowFocus: false, enabled: !!query.item_id }
	);

	if (isError) return <></>;

	return (
		<div className="border-[1px] border-outline border-opacity-50 rounded shadow-lg p-4 mt-4">
			<h3 className="font-bold text-lg mb-4">
				{t("service:similar.title")}{" "}
				{query.loc && `${t("service:similar.near")} ${query.loc}`}
			</h3>
			<section className="flex flex-col overflow-y-scroll max-h-64 overflow-x-hidden">
				{data?.items.map(
					(service: Service, index: number) =>
						index !== 0 && (
							<ServiceItem
								key={service.item_id}
								service={service}
							/>
						)
				)}
			</section>
			{isLoading && <Spinner />}
		</div>
	);
};

export default Similar;
