import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import ServicesOutput from "./ServicesOutput/ServicesOutput";
import "@testing-library/jest-dom/extend-expect";

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

describe("Services", () => {
    test("ServiceList renders services", async () => {
        render(<ServicesOutput services={res.data.items} />);

        await screen.getByText("Test Service One");
        await screen.getByText("This is the first fake service");

        await screen.getByText("Test Service Two");
        await screen.getByText("This is the second fake service");

        const smallLink = await screen.getAllByRole("link")[0];
        await fireEvent.click(smallLink);
        expect(smallLink.closest("a")).toHaveAttribute(
            "href",
            "www.google.com"
        );
    });

    test("Click in-out of service", async () => {
        Object(axios.get).mockResolvedValueOnce(res);
        render(<ServicesOutput services={res.data.items} />);

        const serviceOne = await screen.getByText("Test Service One");
        await fireEvent.click(serviceOne);

        expect(axios.get).toHaveBeenCalled();

        await screen.findByText("Test Service One");
        await screen.findByText("Address:");
        await screen.findByText("This is the first fake service");

        await screen.findByText("View More");
        await screen.findByText("Directions");

        await screen.findByText("Similar");
        await screen.findByText("Test Service Two");
        await screen.findByText("This is the second fake service");

        const backButton = await screen.getByTestId("back-button");
        await fireEvent.click(backButton);

        await expect(screen.queryByText("Address:")).toBeNull();
        await expect(screen.queryByText("View More")).toBeNull();
        await expect(screen.queryByText("Directions")).toBeNull();
        await expect(screen.queryByText("Similar")).toBeNull();
    });
});
