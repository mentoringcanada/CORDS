import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";

describe("Header", () => {
    test("Renders", async () => {
        render(
            <Router>
                <Header />
            </Router>
        );

        await screen.getByAltText("CORDS Title Logo");
        await screen.getByText("Home");
        await screen.getByText("Demos");
    });
    describe("Dropdown", () => {
        test("Demos dropdown menu opens and closes", async () => {
            render(
                <Router>
                    <Header />
                </Router>
            );

            const dropdownButton = await screen.getByText("Demos");
            await fireEvent.click(dropdownButton);

            await waitFor(() => screen.getByText("Food"));
            await screen.getByText("Shelter");
            await screen.getByText("Clothing");
            await screen.getByText("Custom");

            const logo = await screen.getByAltText("CORDS Title Logo");
            await fireEvent.click(logo);

            await expect(screen.queryByText("Food")).toBeNull;
            await expect(screen.queryByText("Shelter")).toBeNull;
            await expect(screen.queryByText("Clothing")).toBeNull;
            await expect(screen.queryByText("Custom")).toBeNull;
        });
        test("Click link", async () => {
            render(
                <Router>
                    <Header />
                </Router>
            );

            const dropdownButton = await screen.getByText("Demos");
            await fireEvent.click(dropdownButton);

            await waitFor(() => screen.getByText("Food"));
            const shelterButton = await screen.getByText("Shelter");
            await fireEvent.click(shelterButton);
        });
    });
});
