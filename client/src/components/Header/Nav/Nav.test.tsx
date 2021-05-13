import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./Nav";

afterEach(cleanup);

test("Nav renders", () => {
    render(
        <Router>
            <Nav />
        </Router>
    );

    screen.getByText("Home");
    screen.getByText("Demos");
});
