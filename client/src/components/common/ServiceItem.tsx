import Link from "next/link";
import { useRouter } from "next/router";

export interface Props {
	service: Service;
}

const ServiceItem = ({
	service: { item_id, name, nom, distance, description, description_fr },
}: Props) => {
	const {
		query: { item_id: item, ...rest },
		locale,
	} = useRouter();

	return (
		<Link
			href={{
				pathname: `/service/[item_id]`,
				query: { ...rest, item_id },
			}}
			passHref={true}
			prefetch={false}
		>
			<article className="border-outline border-[1px] rounded p-4 mt-4 cursor-pointer group border-opacity-50 shadow">
				<h3
					className={`text-lg font-semibold group-hover:underline ${
						!distance && "mb-2"
					}`}
				>
					{locale === "fr" && nom !== "" ? nom : name}
				</h3>
				{typeof distance == "number" && (
					<p className="my-2 opacity-50 !no-underline">
						{distance} km
					</p>
				)}
				<p
					className="opacity-70 !no-underline overflow-hidden overflow-ellipsis line-clamp-3"
					dangerouslySetInnerHTML={{
						__html:
							locale === "fr" && description_fr !== ""
								? description_fr
								: description,
					}}
				></p>
			</article>
		</Link>
	);
};

export default ServiceItem;
