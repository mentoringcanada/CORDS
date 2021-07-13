import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "./App";
import { GET_DEMO_PAGES } from "./helper/CMS";
import axios from "axios";
import { sessionRes } from "./helper/testData";

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

jest.mock("axios");
jest.mock("react-google-places-autocomplete", () => {
    return {
        __esModule: true,
        A: true,
        default: () => {
            return <div>This is the autocomplete</div>;
        },
    };
});

describe("App", () => {
    it("Renders", () => {
        render(
            <MockedProvider mocks={[GET_DEMO_PAGES_MOCK]} addTypename={false}>
                <App />
            </MockedProvider>
        );
        Object(axios.post).mockReturnValueOnce(sessionRes);
    });
    it("Renders with error", async () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <App />
            </MockedProvider>
        );
        Object(axios.post).mockReturnValueOnce(sessionRes);

        await waitFor(() => screen.getByText("Content collection error..."));
    });
});
