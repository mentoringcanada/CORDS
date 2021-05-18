import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";

test("Header renders", () => {
    render(
        <Router>
            <Header />
        </Router>
    );

    screen.getByAltText("CORDS Title Logo");
});
