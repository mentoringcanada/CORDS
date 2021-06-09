import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import WidgetSearch from "./pages/Search/SearchPage";
import Widget from "./Widget";
import { servicesRes, emptyRes } from "../../helper/testData";
import { MockedProvider } from "@apollo/client/testing";
import LanguageContext from "../../helper/LanguageContext";
import { GET_WIDGET_CONTENT } from "../../helper/CMS";
import Search from "./pages/Search/SearchPage";
import HelmetData from "../../helper/Helmet";

jest.mock("axios");

const GET_WIDGET_MOCK = {
    request: {
        query: GET_WIDGET_CONTENT,
        variables: {
            language: "en",
        },
    },
    result: {
        data: {
            widgets: [
                {
                    triggerButtonText: "Trigger",
                },
            ],
        },
    },
};

describe("Widget", () => {
    it("Renders & opens/closes", async () => {
        render(
            <MockedProvider mocks={[GET_WIDGET_MOCK]} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Widget />
                </LanguageContext.Provider>
            </MockedProvider>
        );

        await waitFor(() => screen.getByText("Trigger"));
        const triggerButton = await screen.getByRole("button");
        await fireEvent.click(triggerButton);

        const closeButton = await screen.getByTestId("close-button");
        await fireEvent.click(closeButton);

        await screen.getByText("Trigger");
    });
    it("Renders with error", async () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Widget />
                </LanguageContext.Provider>
            </MockedProvider>
        );

        await waitFor(() => screen.getByText("Content collection error..."));
    });
});
