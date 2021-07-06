import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Start from "./Start";

describe("Start", () => {
    test("Start pop up renders", async () => {
        render(<Start />);

        await screen.getByTestId("pop-up");
        await screen.getByText("Welcome to the CORDS Demo");
        await screen.getByLabelText("PASSWORD");
        await screen.getByRole("button");
    });
    test("Submit with correct password", async () => {
        render(<Start />);

        const input = await screen.getByTestId("password-input");
        const submit = await screen.getByRole("button");
        await fireEvent.change(input, { target: { value: "cordspass" } });
        await fireEvent.click(submit);

        // Check if pop up is gone
        expect(screen.queryByTestId("pop-up")).toBeNull();
        expect(screen.queryByText("Welcome to the CORDS Demo")).toBeNull();
        expect(screen.queryByLabelText("PASSWORD")).toBeNull();
        expect(screen.queryByRole("button")).toBeNull();
    });
    test("Submit with incorrect password", async () => {
        render(<Start />);

        await waitFor(() => screen.getByTestId("password-input"));
        const input = await screen.getByTestId("password-input");
        const submit = await screen.getByRole("button");
        await fireEvent.change(input, { target: { value: "notcordspass" } });
        await fireEvent.click(submit);

        // Check if pop up is still there
        await screen.getByTestId("pop-up");
        await screen.getByText("Welcome to the CORDS Demo");
        await screen.getByLabelText("PASSWORD");
        await screen.getByRole("button");
    });
});
