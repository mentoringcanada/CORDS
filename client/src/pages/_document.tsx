import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body className="font-base text-text box-border bg-primary/[0.1%]">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
