import type { NextPage } from "next";
import Link from "next/link";
import SearchBar from "../components/search/SearchBar";
import { FaSearch } from "react-icons/fa";

const exampleSearches = [
	"Food Bank",
	"Mental Health",
	"Youth Jobs",
	"Clothing Drive",
];

const home: NextPage = () => {
	return (
		<section className="text-center max-w-screen-lg m-auto sm:p-10  md:p-16">
			<h2 className="text-5xl sm:text-6xl md:text-7xl font-bold">
				Find The <span className="text-primary">Opportunities</span> You
				Deserve
			</h2>
			<p className="font-semibold opacity-70 my-10 md:my-20">
				Search over 50,000 services across Canada!
			</p>
			<SearchBar />
			<hr className="my-12 md:my-16 w-10 mx-auto border-primary" />
			<section>
				<h3 className="font-bold text-2xl text-text text-opacity-70">
					Example Searches
				</h3>
				<div className="flex flex-wrap mt-8 flex-col justify-center items-center md:justify-between md:flex-row">
					{exampleSearches.map((search, i) => (
						<Link href={`/search?q=${search}`} key={i}>
							<a className="button-ghost flex items-center mb-4 w-fit m-auto">
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

export default home;
