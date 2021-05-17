import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

test("App renders", () => {
    render(<App />);
});
