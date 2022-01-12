import type { NextPage } from "next";
import Link from "next/link";
import SearchBar from "../components/search/SearchBar";
import { FaSearch } from "react-icons/fa";

const exampleSearches = [
	"Food bank",
	"Youth volunteering",
	"Clothing drive",
	"Mental health",
];

const Home: NextPage = () => {
	return (
		<section className="text-center max-w-screen-lg m-auto p-20">
			<h2 className="text-7xl font-bold">
				Find The <span className="text-primary">Opportunities</span> You
				Deserve
			</h2>
			<p className="font-semibold opacity-70 my-20">
				Search over 50,000 services across Canada!
			</p>
			<SearchBar />
			<hr className="my-16 w-10 mx-auto border-primary" />
			<section>
				<h3 className="font-bold text-xl text-text text-opacity-70">
					Example Searches
				</h3>
				<div className="flex mt-8 justify-between">
					{exampleSearches.map((search, i) => (
						<Link href={`/search?q=${search}`} key={i}>
							<a className="button-filled flex items-center">
								<FaSearch className="h-4 w-4 mb-[2px] mr-2" />{" "}
								{search}
							</a>
						</Link>
					))}
				</div>
			</section>
		</section>
	);
};

export default Home;
