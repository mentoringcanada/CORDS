import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import LocationInput from "./LocationInput";
import { useEffect } from "react";

interface FormData {
	q: string;
}

const SearchBar = () => {
	const router = useRouter();
	const { register, handleSubmit, reset } = useForm<FormData>();

	const search = (data: FormData) => {
		router.push(
			{
				pathname: "/search",
				query: { ...router.query, q: data.q, page: 1 },
			},
			undefined,
			{
				shallow: true,
			}
		);
	};

	useEffect(() => {
		if (router.query) reset(router.query);
	}, [router.query]);

	return (
		<form
			onSubmit={handleSubmit(search)}
			className="flex items-center flex-col md:flex-row"
		>
			<div className="flex items-center py-[1px] w-full md:w-fit md:mr-2 rounded border-2 border-outline border-opacity-50 shadow-xl hover:border-opacity-70 transition grow mb-4 md:mb-0">
				<label htmlFor="q">
					<FaSearch className="w-5 h-5 opacity-50 ml-2" />
				</label>
				<input
					{...register("q")}
					className="p-2 w-full outline-none border-0"
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
		</form>
	);
};

export default SearchBar;
