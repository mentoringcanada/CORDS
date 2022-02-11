import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Meta from "src/components/common/Meta";

const Custom404 = () => {
	const { t } = useTranslation();
	const router = useRouter();
	return (
		<div className="m-auto text-center mt-20">
			<Meta
				title="404 - Page not found"
				description="The page you are looking for does not exist or an other error has occurred."
			/>
			<h1 className="text-9xl font-bold tracking-wider">404</h1>
			<h3 className="text-2xl my-4 opacity-50">
				{t("common:404-page.title")}
			</h3>
			<p>{t("common:404-page.description")}</p>
			<div className="flex justify-center mt-12">
				<button
					className="btn btn-filled mr-4"
					onClick={() => router.back()}
				>
					{t("common:404-page.buttons.back")}
				</button>
				<Link href="/" passHref={true}>
					<button className="btn btn-ghost">
						{t("common:404-page.buttons.home")}
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Custom404;
