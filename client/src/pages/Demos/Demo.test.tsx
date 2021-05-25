import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { servicesRes } from "../../helper/testData";
import CustomDemo from "./CustomDemo/CustomDemo";
import Demo from "./Demo";

jest.mock("axios");

describe("Demos", () => {
    test("Demo renders & functions", async () => {
        render(
            <Demo title="Service Title" description="Service Description" />
        );
        Object(axios.post).mockResolvedValueOnce(servicesRes);

        await screen.getByText("Service Title");
        await screen.getByText("Service Description");
        await screen.getByText("View similar services");

        const viewButton = await screen.getByText("View similar services");
        await fireEvent.click(viewButton);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        await screen.getByTestId("output-container");
        await screen.getByText("Test Service One");
        await screen.getByText("Test Service Two");
    });
    test("CustomDemo renders & functions", async () => {
        render(<CustomDemo />);

        await screen.getByText("Custom Organization");
        await screen.getByText("View similar services");

        const nameInput = await screen.getByPlaceholderText("Name");
        fireEvent.change(nameInput, { target: { value: "Service Name" } });
        const descInput = await screen.getByPlaceholderText("Description");
        fireEvent.change(descInput, {
            target: { value: "Service Description" },
        });

        Object(axios.post).mockResolvedValueOnce(servicesRes);

        const viewButton = await screen.getByText("View similar services");
        await fireEvent.click(viewButton);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        await screen.getByTestId("output-container");
        await screen.getByText("Test Service One");
        await screen.getByText("Test Service Two");
    });
    describe("Demo Info", () => {
        test("Open and close", async () => {
            render(
                <Demo title="Service Title" description="Service Description" />
            );

            await screen.getByText("Demo Help");
            await screen.getByText("Hide");

            const toggleButton = await screen.getByTestId("help-toggle");
            await fireEvent.click(toggleButton);

            await screen.getByText("Help");
        });
    });
});
