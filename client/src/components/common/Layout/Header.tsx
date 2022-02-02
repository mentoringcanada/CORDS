import Image from "next/image";
import Link from "next/link";
import Logo from "/public/logo-primary.svg";

const Header = () => {
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
				<Link href="/" passHref={true}>
					<a className="mr-8 font-semibold opacity-70 transition hover:opacity-100">
						Home
					</a>
				</Link>
				<Link href="/search" passHref={true}>
					<button className="button-ghost">Search</button>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
