import { MockedProvider } from "@apollo/client/testing";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { GET_SEARCH_INPUT_CONTENT } from "../../helper/CMS";
import LanguageContext from "../../helper/LanguageContext";
import { emptyRes, servicesRes } from "../../helper/testData";
import Search from "./Search";

const GET_SEARCH_INPUT_MOCK = {
    request: {
        query: GET_SEARCH_INPUT_CONTENT,
        variables: {
            language: "en",
        },
    },
    result: {
        data: {
            searches: [
                {
                    searchBarPlaceholder: "How can we help?",
                    locationPlaceholder: "Where",
                },
            ],
        },
    },
};

jest.mock("axios");

describe("Search", () => {
    it("Renders and functions", async () => {
        render(
            <MockedProvider mocks={[GET_SEARCH_INPUT_MOCK]} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Search />
                </LanguageContext.Provider>
            </MockedProvider>
        );
        Object(axios.post).mockResolvedValueOnce(servicesRes);

        await waitFor(() => screen.getByPlaceholderText("How can we help?"));
        await screen.getByText("Where");

        const searchButton = await screen.getByTestId("search-button");
        await fireEvent.click(searchButton);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        await screen.getByTestId("output-container");
        await screen.getByText("Test Service One");
        await screen.getByText("Test Service Two");
    });
    it("Renders with no results found", async () => {
        render(
            <MockedProvider mocks={[GET_SEARCH_INPUT_MOCK]} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Search />
                </LanguageContext.Provider>
            </MockedProvider>
        );
        Object(axios.post).mockResolvedValueOnce(emptyRes);

        const searchButton = await screen.getByTestId("search-button");
        await fireEvent.click(searchButton);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        await screen.getByText("No results found in your area...");
    });
});
