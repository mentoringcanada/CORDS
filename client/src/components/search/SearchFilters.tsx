import React from "react";
import { useFormContext } from "react-hook-form";

const distanceValues = [2, 5, 10, 25, 50, 100];
const providerValues = [
	{ value: "community_services", label: "211" },
	{ value: "volunteer", label: "Mentor" },
	{ value: "employment", label: "Magnet" },
];

interface Props {
	search: (data: Search) => void;
}

const SearchFilters = ({ search }: Props) => {
	const { register } = useFormContext();

	return (
		<div className="flex justify-start mt-4">
			<select
				className="p-2 rounded bg-[#ddd] after:absolute after:"
				defaultValue="100"
				{...register("distance", {
					onChange: (e) => search({ distance: e.target.value }),
					valueAsNumber: true,
				})}
			>
				{distanceValues.map((distance) => (
					<option value={distance} key={distance}>
						{distance} km
					</option>
				))}
			</select>
			<div className="flex items-center px-4">
				{providerValues.map(({ value, label }) => (
					<span key={value}>
						<input
							{...register(value, {
								onChange: (e) =>
									search({ [value]: e.target.checked }),
							})}
							className="mr-2"
							id={value}
							type="checkbox"
						/>
						<label className="mr-2" htmlFor={value}>
							{label}
						</label>
					</span>
				))}
			</div>
		</div>
	);
};

export default SearchFilters;