import React from "react";
import { useFormContext } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import LocationInput from "./LocationInput";

const SearchBar = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className="flex items-center flex-col md:flex-row">
			<div className="flex items-center py-[1px] w-full md:w-fit md:mr-2 transition mb-4 md:mb-0 md:flex-[1_1_0px]">
				<label htmlFor="q" className="absolute">
					<FaSearch className="w-4 h-4 opacity-[35%] ml-2" />
				</label>
				<input
					autoComplete="off"
					type="text"
					{...register("q", { required: true })}
					className={`search-text-input ${
						errors.q && "!border-error"
					}`}
					placeholder="Search..."
					defaultValue={""}
				/>
			</div>
			<LocationInput />
			<input
				type="submit"
				value="Search"
				className="button-filled w-full md:w-auto"
			/>
		</div>
	);
};

export default SearchBar;
