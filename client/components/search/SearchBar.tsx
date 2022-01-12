import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import LocationInput from "./LocationInput";

const SearchBar = () => {
	const { register, handleSubmit } = useForm();
	const router = useRouter();

	const search = (data: any) => {
		router.push(
			{
				pathname: "/search",
				query: { ...router.query, q: data.query, page: 1 },
			},
			undefined,
			{
				shallow: true,
			}
		);
	};

	return (
		<form
			onSubmit={handleSubmit(search)}
			className="border-2 border-outline border-opacity-50 flex p-2 rounded items-center shadow-xl hover:border-opacity-70 transition"
		>
			<label htmlFor="query">
				<FaSearch className="w-5 h-5 opacity-50" />
			</label>
			<input
				className="mx-2 p-2 grow outline-none border-0"
				{...register("query")}
				placeholder="Search..."
				defaultValue={router.query.q}
			/>
			<label htmlFor="location">
				<FaMapMarkerAlt className="w-6 h-6 opacity-50" />
			</label>
			<LocationInput />
			<input type="submit" value="Search" className="button-filled" />
		</form>
	);
};

export default SearchBar;
