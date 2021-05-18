import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Search from "./Search";

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
                distance: null,
                link: "google.com",
            },
            {
                name: "Test Service Two",
                description: "This is the second fake service",
                item_id: "69797998",
                lat: 49.0,
                lng: -82.0,
                address: "30 Up Street",
                distance: null,
                link: "google.com",
            },
        ],
    },
};

jest.mock("axios");

describe("Search", () => {
    test("Search renders and functions", async () => {
        render(<Search />);

        await screen.getByPlaceholderText("How can we help?");
        await screen.getByText("Where");
        await screen.getByText("Within");

        Object(axios.post).mockResolvedValueOnce(res);

        const searchButton = await screen.getByTestId("search-button");
        await fireEvent.click(searchButton);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        await screen.getByTestId("output-container");
        await screen.getByText("Test Service One");
        await screen.getByText("Test Service Two");
    });
});
