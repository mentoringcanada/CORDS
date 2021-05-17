import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Demo from "./Demo";

afterEach(cleanup);

test("Demo renders", () => {
    render(<Demo title="Service Title" description="Service Description" />);

    screen.getByText("Service Title");
    screen.getByText("Service Description");
    screen.getByRole("button");
    screen.getByText("View similar services");
});

test("Click view similar services", async () => {
    render(<Demo title="Service Title" description="Service Description" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Todo
});
