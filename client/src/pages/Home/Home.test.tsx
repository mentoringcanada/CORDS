import { render, screen, cleanup } from "@testing-library/react";
import Home from "./Home";

afterEach(cleanup);

test("Home page renders", () => {
    render(<Home />);

    screen.getByAltText("Hands holding give sign");
    screen.getByText("Integrity");
    screen.getByText("Giving");
    screen.getByText("Unity");
});
