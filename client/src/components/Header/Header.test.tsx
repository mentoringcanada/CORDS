import { render, cleanup, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

test("Header renders", () => {
    render(
        <Router>
            <Header />
        </Router>
    );

    screen.getByAltText("CORDS Title Logo");
});
