import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type Props = {
	lat: number;
	lng: number;
};

const Map = ({ lat, lng }: Props) => {
	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loader = new Loader({
			apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API}`,
			libraries: ["places"],
			version: "weekly",
		});

		loader.load().then(() => {
			if (container.current) {
				const map = new google.maps.Map(
					container.current as HTMLDivElement,
					{
						center: { lat, lng },
						zoom: 16,
					}
				);
				new google.maps.Marker({
					position: { lat, lng },
					map,
				});
			}
		});
	}, [container, lat, lng]);

	return (
		<div
			className="min-h-[240px] md:mb-0 flex-grow min-w-[40%]"
			ref={container}
		/>
	);
};

export default Map;
