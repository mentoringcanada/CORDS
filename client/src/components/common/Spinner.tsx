import Image from "next/image";
import SpinnerSVG from "public/spinner.svg";

const Spinner = () => {
	return (
		<div className="flex justify-center items-center" role="status">
			<Image width={40} height={40} src={SpinnerSVG} alt="spinner" />
		</div>
	);
};

export default Spinner;
