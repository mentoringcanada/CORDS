import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { SearchContext } from "./SearchForm";

const distanceValues = [2, 5, 10, 25, 50, 100];

const providerValues = [
	{ value: "community_services", label: "211" },
	{ value: "volunteer", label: "Mentor" },
	{ value: "employment", label: "Magnet" },
];

const SearchFilters = () => {
	const { updateSearch } = useContext(SearchContext);
	const { register } = useFormContext();

	return (
		<div className="flex justify-start mt-4 whitespace-nowrap flex-wrap">
			<select
				className="appearance-none h-11 relative pl-3 py-2 pr-8 bg-outline/10 text-text cursor-pointer rounded outline-none bg-no-repeat mr-2 mb-2"
				style={{
					backgroundImage: `url('/down-arrow-filled.svg')`,
					backgroundPosition: "right 12px top 50%",
					backgroundSize: "10px",
				}}
				aria-label="distance"
				defaultValue="100"
				{...register("distance", {
					onChange: (e) => updateSearch({ distance: e.target.value }),
					valueAsNumber: true,
				})}
			>
				{distanceValues.map((distance) => (
					<option
						value={distance}
						key={distance}
						className="bg-white text-text"
					>
						{distance} km
					</option>
				))}
			</select>
			<div className="flex h-11 items-center pr-2 pl-4 py-2 mb-2 bg-outline/10 rounded">
				{providerValues.map(({ value, label }) => (
					<span key={value}>
						<input
							{...register(value, {
								onChange: (e) =>
									updateSearch({ [value]: e.target.checked }),
							})}
							className="mr-2 cursor-pointer"
							id={value}
							type="checkbox"
						/>
						<label className="mr-2 cursor-pointer" htmlFor={value}>
							{label}
						</label>
					</span>
				))}
			</div>
		</div>
	);
};

export default SearchFilters;
