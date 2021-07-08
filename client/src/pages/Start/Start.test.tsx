import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Start from "./Start";

describe("Start", () => {
    it("Renders", async () => {
        render(<Start />);

        await screen.getByTestId("pop-up");
        await screen.getByText("Welcome to the CORDS Demo");
        await screen.getByLabelText("PASSWORD");
        await screen.getByRole("button");
    });
    it("Submits with correct password", async () => {
        render(<Start />);

        const input = await screen.getByTestId("password-input");
        const submit = await screen.getByRole("button");

        // Incorrect password
        await fireEvent.change(input, { target: { value: "notcordspass" } });
        await fireEvent.click(submit);
        await screen.getByText("Welcome to the CORDS Demo");

        // Correct password
        await fireEvent.change(input, { target: { value: "cordspass" } });
        await fireEvent.click(submit);
        expect(screen.queryByText("Welcome to the CORDS Demo")).toBeNull();
    });
});
