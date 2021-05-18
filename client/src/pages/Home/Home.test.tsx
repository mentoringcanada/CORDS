import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("Home page renders", () => {
    render(<Home />);

    screen.getByAltText("Hands holding give sign");
    screen.getByText("Integrity");
    screen.getByText("Giving");
    screen.getByText("Unity");
});
