import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import CustomDemo from "./CustomDemo/CustomDemo";
import Demo from "./Demo";

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

describe("Demos", () => {
    test("Demo renders & functions", async () => {
        await render(
            <Demo title="Service Title" description="Service Description" />
        );

        await screen.getByText("Service Title");
        await screen.getByText("Service Description");
        await screen.getByText("View similar services");

        Object(axios.post).mockResolvedValueOnce(res);

        const viewButton = await screen.getByText("View similar services");
        await fireEvent.click(viewButton);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        await screen.getByTestId("output-container");
        await screen.getByText("Test Service One");
        await screen.getByText("Test Service Two");
    });
    test("CustomDemo renders & functions", async () => {
        await render(<CustomDemo />);

        await screen.getByText("Custom Organization");
        await screen.getByText("View similar services");

        const nameInput = await screen.getByPlaceholderText("Name");
        fireEvent.change(nameInput, { target: { value: "Service Name" } });
        const descInput = await screen.getByPlaceholderText("Description");
        fireEvent.change(descInput, {
            target: { value: "Service Description" },
        });

        Object(axios.post).mockResolvedValueOnce(res);

        const viewButton = await screen.getByText("View similar services");
        await fireEvent.click(viewButton);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        await screen.getByTestId("output-container");
        await screen.getByText("Test Service One");
        await screen.getByText("Test Service Two");
    });
});
