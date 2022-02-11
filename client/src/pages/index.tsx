import type { NextPage } from "next";
import Link from "next/link";
import SearchBar from "../components/search/SearchForm";
import { FaSearch } from "react-icons/fa";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import Head from "next/head";
import Meta from "src/components/common/Meta";

const HomePage: NextPage = () => {
	const { t } = useTranslation();

	return (
		<section className="text-center max-w-screen-lg m-auto sm:p-10  md:p-16">
			<Meta
				title="Search Engine For Services Across Canada | CORDS"
				description="CORDS is a natural language search for over 50,000 services across Canada aimed to provide fast and easy lookup of the opportunities you need."
			/>
			<Trans
				i18nKey="home:hero.title"
				components={[
					<h2
						key={0}
						className="text-5xl sm:text-6xl md:text-7xl font-bold"
					/>,
					<b key={1} className="text-primary" />,
				]}
			/>
			<p className="font-semibold opacity-70 my-10 md:my-20">
				{t("home:hero.exclamation")}
			</p>
			<SearchBar />
			<hr className="my-12 md:my-16 w-10 mx-auto border-primary" />
			<section>
				<h3 className="font-bold text-2xl text-text text-opacity-70">
					{t("home:examples.title")}
				</h3>
				<div className="flex flex-wrap mt-8 flex-col justify-center items-center md:justify-between md:flex-row">
					{[1, 2, 3, 4].map((x, i) => {
						const text = t("home:examples.example-text", {
							count: i,
						});
						return (
							<Link href={`/search?q=${text}`} key={x}>
								<a className="btn btn-ghost flex items-center mb-4 w-fit m-auto">
									<FaSearch className="h-4 w-4 mb-[2px] mr-2" />{" "}
									{text}
								</a>
							</Link>
						);
					})}
				</div>
			</section>
		</section>
	);
};

export default HomePage;
