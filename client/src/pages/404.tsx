import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Custom404 = () => {
	const router = useRouter();
	return (
		<div className="m-auto text-center mt-20">
			<h1 className="text-9xl font-bold tracking-wider">404</h1>
			<h3 className="text-2xl my-4 opacity-50">Page not found</h3>
			<p>
				The page you are looking for does not exist or an other error
				has occurred.
			</p>
			<div className="flex justify-center mt-12">
				<button
					className="button-filled mr-4"
					onClick={() => router.back()}
				>
					Go Back
				</button>
				<Link href="/" passHref={true}>
					<button className="button-ghost">Go Home</button>
				</Link>
			</div>
		</div>
	);
};

export default Custom404;
