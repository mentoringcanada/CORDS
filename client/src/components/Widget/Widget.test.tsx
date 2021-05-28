import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import WidgetSearch from "./pages/Search/Search";
import Widget from "./Widget";
import { servicesRes, emptyRes } from "../../helper/testData";
import { MockedProvider } from "@apollo/client/testing";
import LanguageContext from "../../helper/LanguageContext";
import { GET_WIDGET_CONTENT } from "../../helper/CMS";
import Search from "./pages/Search/Search";

jest.mock("axios");

const GET_WIDGET_MOCK = {
    request: {
        query: GET_WIDGET_CONTENT,
        variables: {
            language: "en",
        },
    },
    result: {
        data: {
            widgets: [
                {
                    triggerButtonText: "Trigger",
                },
            ],
        },
    },
};

describe("Widget", () => {
    it("Renders & opens/closes without error", async () => {
        render(
            <MockedProvider mocks={[GET_WIDGET_MOCK]} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Widget />
                </LanguageContext.Provider>
            </MockedProvider>
        );

        await waitFor(() => screen.getByText("Trigger"));
        const triggerButton = await screen.getByRole("button");
        await fireEvent.click(triggerButton);

        const closeButton = await screen.getByTestId("close-button");
        await fireEvent.click(closeButton);

        await screen.getByText("Trigger");
    });
    it("Renders with error", async () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Widget />
                </LanguageContext.Provider>
            </MockedProvider>
        );

        await waitFor(() => screen.getByText("Content collection error..."));
    });
    describe("Search", () => {
        test("No location/distance", async () => {
            render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <Search />
                    </LanguageContext.Provider>
                </MockedProvider>
            );
            await Object(axios.post).mockResolvedValueOnce(servicesRes);

            const searchBar = await screen.getByTestId("search-input");
            await fireEvent.change(searchBar, {
                target: { value: "I need food" },
            });

            const submitButton = await screen.getByTestId("search-button");
            await fireEvent.click(submitButton);

            await waitFor(() => expect(axios.post).toHaveBeenCalled());

            await screen.getByText("Test Service One");
            await screen.getByText("Test Service Two");
        });
        test("No results found", async () => {
            render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <WidgetSearch />
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
});
