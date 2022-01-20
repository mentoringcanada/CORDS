import React from "react";
import { useFormContext } from "react-hook-form";

const distanceValues = [2, 5, 10, 25, 50, 100];

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
				})}
			>
				{distanceValues.map((distance) => (
					<option value={distance} key={distance}>
						{distance} km
					</option>
				))}
			</select>
		</div>
	);
};

export default SearchFilters;
