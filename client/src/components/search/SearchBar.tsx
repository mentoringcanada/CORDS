import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import LocationInput from "./LocationInput";

const SearchBar = () => {
	const { t } = useTranslation();
	const {
		register,
		formState: { errors },
		setFocus,
	} = useFormContext();

	useEffect(() => {
		setFocus("q");
	}, [setFocus]);

	return (
		<div className="flex items-center flex-col md:flex-row">
			<label className="flex items-center py-[1px] w-full md:w-fit md:mr-2 transition mb-4 md:mb-0 md:flex-[1_1_0px]">
				<FaSearch className="absolute w-4 h-4 opacity-[35%] ml-2" />
				<input
					autoComplete="off"
					type="text"
					{...register("q", { required: true })}
					className={`transition h-11 px-10 w-full outline-none border border-outline/50 rounded focus:border-primary shadow focus:shadow-md ${
						errors.q && "!border-error"
					}`}
					id="q"
					aria-label="query"
					placeholder={`${t("search:search-bar.placeholders.query")}`}
					defaultValue={""}
				/>
			</label>
			<LocationInput />
			<input
				type="submit"
				value={`${t("search:search-bar.search-button")}`}
				className="btn btn-primary w-full md:w-auto"
			/>
		</div>
	);
};

export default SearchBar;
