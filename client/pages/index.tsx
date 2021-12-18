import type { NextPage } from "next";
import SearchBar from "../components/search/SearchBar";

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
		</section>
	);
};

export default Home;
