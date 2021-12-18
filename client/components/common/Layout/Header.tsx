import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/logo-primary.svg";

const Header = () => {
	return (
		<header className="h-20 flex justify-between items-center p-4 max-w-screen-xl m-auto">
			<div className="flex">
				<Image
					height={"40px"}
					width={"40px"}
					src={Logo}
					alt="CORDS logo image"
				/>
				<h1 className="font-bold text-2xl ml-1 mt-4 text-primary">
					CORDS
				</h1>
			</div>
			<nav>
				<Link href="/">
					<a className="mr-8 font-semibold opacity-70 transition hover:opacity-100">
						Home
					</a>
				</Link>
				<Link href="/search">
					<a className="font-semibold text-primary px-6 py-2 border-2 border-primary rounded hover:bg-primary hover:bg-opacity-[0.13] transition">
						Search
					</a>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
