import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Widget from "./Widget";

const res = {
    data: {
        items: [
            {
                name: "Test Service One",
                description: "This is the first fake service",
                item_id: "69797999",
                lat: 45.0,
                lng: -80.0,
                address: "20 Made Street",
                distance: 15,
                link: "www.google.com",
            },
            {
                name: "Test Service Two",
                description: "This is the second fake service",
                item_id: "69797998",
                lat: 49.0,
                lng: -82.0,
                address: "30 Up Street",
                distance: 20,
                link: "google.com",
            },
        ],
    },
};

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
            await Object(axios.post).mockResolvedValueOnce(res);
            render(<Widget />);

            const triggerButton = await screen.getByRole("button");
            await fireEvent.click(triggerButton);
            await waitFor(() =>
                screen.getByPlaceholderText("How can we help?")
            );

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
    });
});
