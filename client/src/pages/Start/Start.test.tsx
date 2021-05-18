import { render, screen, fireEvent } from "@testing-library/react";
import Start from "./Start";

describe("Start", () => {
    test("Start pop up renders", () => {
        render(<Start />);

        screen.getByTestId("pop-up");
        screen.getByText("Welcome to the CORDS Demo");
        screen.getByLabelText("PASSWORD");
        screen.getByRole("button");
    });
    test("Submit with correct password", () => {
        render(<Start />);

        const input = screen.getByTestId("password-input");
        const submit = screen.getByRole("button");
        fireEvent.change(input, { target: { value: "cordspass" } });
        fireEvent.click(submit);

        // Check if pop up is gone
        expect(screen.queryByTestId("pop-up")).toBeNull;
        expect(screen.queryByText("Welcome to the CORDS Demo")).toBeNull;
        expect(screen.queryByLabelText("PASSWORD")).toBeNull;
        expect(screen.queryByRole("button")).toBeNull;
    });
    test("Submit with incorrect password", () => {
        render(<Start />);

        const input = screen.getByTestId("password-input");
        const submit = screen.getByRole("button");
        fireEvent.change(input, { target: { value: "notcordspass" } });
        fireEvent.click(submit);

        // Check if pop up is still there
        screen.getByTestId("pop-up");
        screen.getByText("Welcome to the CORDS Demo");
        screen.getByLabelText("PASSWORD");
        screen.getByRole("button");
    });
});
