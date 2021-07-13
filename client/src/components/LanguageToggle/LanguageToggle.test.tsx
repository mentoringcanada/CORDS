import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import App from "../../App";

jest.mock("react-google-places-autocomplete", () => {
    return {
        __esModule: true,
        A: true,
        default: () => {
            return <div>This is the autocomplete</div>;
        },
    };
});

describe("Language Toggle", () => {
    const history = createMemoryHistory();
    test("Renders and toggles", async () => {
        render(
            <MockedProvider addTypename={false} mocks={[]}>
                <Router history={history}>
                    <App />
                </Router>
            </MockedProvider>
        );

        const frenchButton = await screen.getByText("FR");
        fireEvent.click(frenchButton);

        const englishButton = await screen.getByText("EN");
        fireEvent.click(englishButton);
        await screen.getByText("FR");
    });
});
