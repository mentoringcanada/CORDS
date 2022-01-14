import { Loader } from "@googlemaps/js-api-loader";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

let autocomplete: google.maps.places.Autocomplete;

let options = {
	fields: ["formatted_address", "geometry"],
	componentRestrictions: { country: ["CA"] },
};

const LocationInput = () => {
	const router = useRouter();
	const input = useRef<HTMLInputElement>(null);

	const onLocationChange = () => {
		if (autocomplete.getPlace() === null) {
			let { loc, lat, lng, ...rest } = router.query;
			router.push(
				{
					query: {
						...rest,
						page: 1,
					},
				},
				undefined,
				{ shallow: true }
			);
		} else {
			let { formatted_address, geometry } = autocomplete.getPlace();

			if (geometry?.location && formatted_address) {
				router.push(
					{
						query: {
							...router.query,
							loc: formatted_address,
							lat: geometry.location.lat(),
							lng: geometry.location.lng(),
							page: 1,
						},
					},
					undefined,
					{ shallow: true }
				);
			}
		}
	};

	useEffect(() => {
		const loader = new Loader({
			apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API}`,
			libraries: ["places"],
			version: "weekly",
		});

		loader.load().then(() => {
			if (input.current) {
				autocomplete = new google.maps.places.Autocomplete(
					input.current,
					options
				);
				autocomplete.addListener("place_changed", onLocationChange);
			}
		});
	});

	return (
		<div className="flex items-center py-[1px] w-full md:w-fit md:mr-2 rounded border-2 border-outline border-opacity-50 shadow-xl hover:border-opacity-70 transition grow mb-4 md:mb-0">
			<label htmlFor="location">
				<FaMapMarkerAlt className="w-6 h-6 opacity-50 ml-2" />
			</label>
			<input
				className="p-2 w-full outline-none border-0 "
				placeholder="Location..."
				type="text"
				defaultValue={router.query.loc}
				ref={input}
			/>
			{input.current && input.current.value != "" && (
				<div
					className="font-bold text-text opacity-50 p-2 cursor-pointer transition"
					title="Clear location"
					onClick={() => {
						autocomplete.set("place", null);
						if (input.current) {
							input.current.value = "";
							input.current.focus();
						}
					}}
				>
					&#10005;
				</div>
			)}
		</div>
	);
};

export default LocationInput;
