import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { emptyRes, servicesRes } from "../../helper/testData";
import Search from "./Search";

jest.mock("axios");

describe("Search", () => {
    test("Search renders and functions", async () => {
        render(<Search />);
        Object(axios.post).mockResolvedValueOnce(servicesRes);

        await screen.getByPlaceholderText("How can we help?");
        await screen.getByText("Where");
        await screen.getByText("Within");

        const searchButton = await screen.getByTestId("search-button");
        await fireEvent.click(searchButton);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        await screen.getByTestId("output-container");
        await screen.getByText("Test Service One");
        await screen.getByText("Test Service Two");
    });
    test("No results found", async () => {
        render(<Search />);
        Object(axios.post).mockResolvedValueOnce(emptyRes);

        const searchButton = await screen.getByTestId("search-button");
        await fireEvent.click(searchButton);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        await screen.getByText("No results found in your area...");
    });
});
