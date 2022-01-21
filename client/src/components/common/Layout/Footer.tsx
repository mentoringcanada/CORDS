import Image from "next/image";
import Logo from "/public/logo-white.svg";

const Footer = () => {
	return (
		<footer className="bg-primary text-white p-2 flex justify-between items-center max-w-screen">
			<Image
				height={"20px"}
				width={"20px"}
				src={Logo}
				alt="CORDS logo image"
			/>
			<p>© CORDS</p>
		</footer>
	);
};

export default Footer;
