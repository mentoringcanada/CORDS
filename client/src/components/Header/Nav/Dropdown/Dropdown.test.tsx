import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Dropdown from "./Dropdown";

test("Dropdown renders", () => {
    render(
        <Router>
            <Dropdown />
        </Router>
    );

    screen.getByText("Demos");
});

test("Dropdown menu opens and closes", () => {
    render(
        <Router>
            <Dropdown />
            <div data-testid="other-element"></div>
        </Router>
    );

    screen.getByText("Demos");

    const otherElement = screen.getByTestId("other-element");
    const dropdownButton = screen.getByRole("button");
    fireEvent.click(dropdownButton);

    screen.getByText("Food");
    screen.getByText("Shelter");
    screen.getByText("Clothing");
    screen.getByText("Custom");

    fireEvent.click(otherElement);

    expect(screen.queryByText("Food")).toBeNull;
    expect(screen.queryByText("Shelter")).toBeNull;
    expect(screen.queryByText("Clothing")).toBeNull;
    expect(screen.queryByText("Custom")).toBeNull;
});
