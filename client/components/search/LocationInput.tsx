import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

let autocomplete: google.maps.places.Autocomplete;

const LocationInput = () => {
	const router = useRouter();
	const input = useRef<HTMLInputElement>(null);

	const onLocationChange = () => {
		let { formatted_address, geometry } = autocomplete.getPlace();

		if (geometry?.location) {
			router.push(
				{
					pathname: "/search",
					query: {
						...router.query,
						loc: formatted_address,
						lat: geometry.location.lat(),
						lng: geometry.location.lng(),
						page: 1,
					},
				},
				undefined,
				{
					shallow: true,
				}
			);
		}
	};

	useEffect(() => {
		if (input.current) {
			autocomplete = new google.maps.places.Autocomplete(input.current, {
				fields: ["formatted_address", "geometry"],
				componentRestrictions: { country: ["CA"] },
			});
			autocomplete.addListener("place_changed", onLocationChange);
		}
	});

	return (
		<input
			className="mx-2 p-2 grow outline-none border-0"
			placeholder="Location..."
			type="text"
			defaultValue={router.query.loc}
			ref={input}
		/>
	);
};

export default LocationInput;
