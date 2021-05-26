import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import WidgetSearch from "./pages/WidgetSearch/WidgetSearch";
import Widget from "./Widget";
import { servicesRes, emptyRes } from "../../helper/testData";

jest.mock("axios");

describe("Widget", () => {
    test("Open and close widget", async () => {
        render(<Widget />);

        await screen.getByText("Find Resources");
        const triggerButton = await screen.getByRole("button");
        await fireEvent.click(triggerButton);

        await waitFor(() => screen.getByPlaceholderText("How can we help?"));

        await screen.getByText("Where");
        await screen.getByText("Within");
        await screen.getAllByTestId("output-container");

        const closeButton = await screen.getByTestId("close-button");
        await fireEvent.click(closeButton);

        await screen.getByText("Find Resources");
    });
    describe("Search", () => {
        test("No location/distance", async () => {
            render(<WidgetSearch />);
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
            render(<WidgetSearch />);
            Object(axios.post).mockResolvedValueOnce(emptyRes);

            const searchButton = await screen.getByTestId("search-button");
            await fireEvent.click(searchButton);

            await waitFor(() => expect(axios.post).toHaveBeenCalled());

            await screen.getByText("No results found in your area...");
        });
    });
});
