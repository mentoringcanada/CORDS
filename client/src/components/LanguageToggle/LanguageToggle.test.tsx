import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import App from "../../App";

describe("Language Toggle", () => {
    test("Renders and toggles", async () => {
        render(
            <MockedProvider addTypename={false} mocks={[]}>
                <App />
            </MockedProvider>
        );

        const frenchButton = await screen.getByText("FR");
        fireEvent.click(frenchButton);

        const englishButton = await screen.getByText("EN");
        fireEvent.click(englishButton);
        await screen.getByText("FR");
    });
});
