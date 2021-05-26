import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("Home page renders", () => {
    render(<Home />);

    screen.getByText("CORDS Portal");
    screen.getByText("Search");
    screen.getByText("Organization Demos");
});
