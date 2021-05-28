import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "./App";
import { GET_DEMO_PAGES } from "./helper/CMS";

const GET_DEMO_PAGES_MOCK = {
    request: {
        query: GET_DEMO_PAGES,
        variables: {
            language: "en",
        },
    },
    result: {
        data: {
            demoPages: [
                {
                    route: "custom",
                    description: null,
                    name: "",
                },
                {
                    route: "food",
                    description: "Fake food bank",
                    name: "Food Bank",
                },
            ],
        },
    },
};

it("Renders", () => {
    render(
        <MockedProvider mocks={[GET_DEMO_PAGES_MOCK]} addTypename={false}>
            <App />
        </MockedProvider>
    );
});
it("Renders with error", async () => {
    render(
        <MockedProvider mocks={[]} addTypename={false}>
            <App />
        </MockedProvider>
    );

    await waitFor(() => screen.getByText("Content collection error..."));
});
