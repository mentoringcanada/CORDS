import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "/public/logo-primary.svg";

const Header = () => {
	const router = useRouter(),
		{ pathname, asPath, query, locale } = router;
	const { t } = useTranslation();

	const changeLocale = (e: any) =>
		router.push({ pathname, query }, asPath, { locale: e.target.value });
	return (
		<header className="h-20 flex justify-between items-center p-4 max-w-screen-xl m-auto">
			<Link href="/" passHref={true}>
				<div className="flex cursor-pointer p-1">
					<Image
						height={"32px"}
						width={"32px"}
						src={Logo}
						alt="CORDS logo image"
					/>
					<h1 className="font-bold text-xl ml-1 mt-4 text-primary hidden md:block">
						CORDS
					</h1>
				</div>
			</Link>
			<nav className="flex items-center">
				<select
					onChange={changeLocale}
					defaultValue={locale || "en"}
					className="mr-6 appearance-none font-semibold opacity-70 bg-white !bg-opacity-0 border-none outline-none cursor-pointer hover:opacity-100 bg-no-repeat pr-5 pl-[2px]"
					style={{
						backgroundImage: `url('/down-arrow.svg')`,
						backgroundPosition: "right 4px top 50%",
						backgroundSize: "12px",
					}}
				>
					<option value="en">EN</option>
					<option value="fr">FR</option>
				</select>
				<Link href="/" passHref={true}>
					<a className="mr-8 font-semibold opacity-70 transition hover:opacity-100">
						{t("common:layout.header.nav.home")}
					</a>
				</Link>
				<Link href="/search" passHref={true}>
					<button className="btn btn-ghost" aria-label="Search page">
						{t("common:layout.header.nav.search")}
					</button>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
