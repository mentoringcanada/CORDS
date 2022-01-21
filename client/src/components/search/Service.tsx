import Link from "next/link";

export interface Props {
	item_id: number;
	name: string;
	distance: number | null;
	description: string;
}

const Service = ({ item_id, name, distance, description }: Props) => {
	return (
		<Link href={`/service/${item_id}`} passHref={true}>
			<article className="border-outline border-[1px] rounded p-4 mt-4 cursor-pointer group border-opacity-50 shadow-lg">
				<h3
					className={`text-lg font-semibold group-hover:underline ${
						!distance && "mb-2"
					}`}
				>
					{name}
				</h3>
				{distance && (
					<p className="my-2 opacity-50 !no-underline">
						{distance} km
					</p>
				)}
				<p className="opacity-70 !no-underline overflow-hidden">
					{description}
				</p>
			</article>
		</Link>
	);
};

export default Service;
