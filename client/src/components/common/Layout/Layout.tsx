import Footer from "./Footer";
import Header from "./Header";

interface Props {
	children: JSX.Element;
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<Header />
			<main className="m-auto max-w-screen-lg p-4 min-h-screen">
				{children}
			</main>
			<Footer />
		</>
	);
};

export default Layout;
