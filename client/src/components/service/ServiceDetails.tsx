import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";
import { FaDirections } from "react-icons/fa";

type Props = {
	service: Service;
};

const ServiceDetails = ({
	service: {
		name,
		nom,
		address,
		lat,
		lng,
		description,
		description_fr,
		phone,
		resource_type,
	},
}: Props) => {
	const { t } = useTranslation();
	const { locale } = useRouter();

	return (
		<section className="flex-grow-[2] p-4">
			<h1 className="text-2xl font-semibold mb-2">
				{locale === "fr" && nom !== "" ? nom : name}
			</h1>
			{address && (
				<a
					href={`https://google.ca/maps?q=${lat},${lng}`}
					target="_blank"
					rel="noreferrer"
				>
					<div className="flex cursor-pointer text-primary hover:underline items-center">
						<FaDirections className="w-5 h-5 mr-2" id="location" />
						<p className="mt-[2px]">{address}</p>
					</div>
				</a>
			)}
			<p
				className="opacity-70 my-4"
				dangerouslySetInnerHTML={{
					__html:
						locale === "fr" && description_fr !== ""
							? description_fr
							: description,
				}}
			></p>
			<div className="flex flex-wrap">
				{phone && (
					<div className="mr-8 mt-2">
						<h3 className="text-md font-semibold mb-1">
							{t("service:data.contact")}
						</h3>
						<p className="opacity-70">{phone}</p>
					</div>
				)}
				{resource_type && (
					<div className="mr-8 mt-2">
						<h3 className="text-md font-semibold mb-1">
							{t("service:data.source")}
						</h3>
						<p className="opacity-70">{resource_type}</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default ServiceDetails;
