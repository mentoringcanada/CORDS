import { Loader } from "@googlemaps/js-api-loader";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaMapMarkerAlt } from "react-icons/fa";
import { SearchContext } from "./SearchForm";

let autocomplete: google.maps.places.AutocompleteService;
let places: google.maps.places.PlacesService;

const options = {
	fields: ["geometry"],
	componentRestrictions: { country: "CA" },
};

const LocationInput = () => {
	const { search } = useContext(SearchContext);
	const {
		register,
		setValue,
		setFocus,
		watch,
		formState: { errors },
	} = useFormContext();

	const [predictions, setPredictions] = useState<
		google.maps.places.AutocompletePrediction[] | null
	>(null);
	const router = useRouter();
	const container = useRef<HTMLDivElement>(null);

	const locationTextChange = (e: any) => {
		e.target.value
			? autocomplete.getPlacePredictions(
					{ input: e.target.value, ...options },
					(data) => setPredictions(data)
			  )
			: setPredictions(null);
	};

	const clearLocation = () => {
		setValue("loc", "");
		setFocus("loc");
		const { loc, lat, lng, ...rest } = router.query;
		router.push({ query: rest }, undefined, {
			shallow: true,
		});
	};

	const selectPrediction = ({
		description,
		place_id,
	}: google.maps.places.AutocompletePrediction) => {
		setPredictions(null);
		setValue("loc", description);
		places.getDetails(
			{
				placeId: place_id,
				fields: options.fields,
			},
			(data: google.maps.places.PlaceResult | null) => {
				if (data) {
					const { geometry } = data;
					search({
						loc: description,
						lat: geometry?.location?.lat(),
						lng: geometry?.location?.lng(),
					});
				}
			}
		);
	};

	useEffect(() => {
		const loader = new Loader({
			apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API}`,
			libraries: ["places"],
			version: "weekly",
		});

		loader.load().then(() => {
			autocomplete = new google.maps.places.AutocompleteService();
			if (container.current)
				places = new google.maps.places.PlacesService(
					container.current
				);
		});
	}, [container]);

	return (
		<div
			className={`flex flex-col py-[1px] w-full md:w-fit md:mr-2 rounded transition mb-4 md:mb-0 md:flex-[1_1_0px] relative ${
				predictions && "rounded-b-none shadow-none"
			}`}
		>
			<div className="flex items-center w-full">
				<label htmlFor="location" className="absolute">
					<FaMapMarkerAlt className="w-5 h-5 opacity-[30%] ml-2" />
				</label>
				<input
					{...register("loc", {
						required: true,
						onChange: locationTextChange,
					})}
					className={`search-text-input ${
						(errors.loc && "!border-error") ||
						(predictions && "!rounded-b-none !border-primary")
					}`}
					placeholder="Location..."
					type="text"
					autoComplete="off"
					defaultValue={""}
				/>
			</div>
			<div ref={container}>
				{predictions && (
					<ul className="absolute left-0 right-0 border border-t-0 border-primary rounded-b shadow-xl bg-white mt-[-1px] whitespace-nowrap">
						{predictions.map(
							(
								prediction: google.maps.places.AutocompletePrediction
							) => (
								<li
									className="py-2 px-10 hover:bg-outline hover:bg-opacity-[0.14] cursor-pointer transition text-text relative overflow-hidden overflow-ellipsis"
									key={prediction.place_id}
									onClick={() => selectPrediction(prediction)}
								>
									<FaMapMarkerAlt className="absolute left-0 w-5 h-5 opacity-[30%] ml-2" />
									{prediction.description}
								</li>
							)
						)}
					</ul>
				)}
			</div>
			{watch("loc") && (
				<div
					className="font-bold text-text opacity-50 p-2 cursor-pointer transition absolute right-0"
					title="Clear location"
					onClick={clearLocation}
				>
					&#10005;
				</div>
			)}
		</div>
	);
};

export default LocationInput;
