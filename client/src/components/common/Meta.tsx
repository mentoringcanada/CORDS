import Head from "next/head";
import React from "react";

type Props = {
	title: string;
	description: string;
};

const Meta = ({ title, description }: Props) => {
	return (
		<Head>
			<title>{title} | CORDS</title>
			<meta name="description" content={description} />
		</Head>
	);
};

export default Meta;
