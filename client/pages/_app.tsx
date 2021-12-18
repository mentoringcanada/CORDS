import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/common/Layout/Layout";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<Layout>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Component {...pageProps} />
				</Hydrate>
			</QueryClientProvider>
		</Layout>
	);
}

export default MyApp;
