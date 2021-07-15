import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { MockedProvider } from "@apollo/client/testing";
import { servicesRes } from "../../helper/testData";
import Demo from "./Demo";
import { GET_DEMO_CONTENT } from "../../helper/CMS";
import LanguageContext from "../../helper/LanguageContext";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

window.scrollTo = jest.fn();

// Mocks
const GET_DEMO_MOCK = {
    request: {
        query: GET_DEMO_CONTENT,
        variables: {
            language: "en",
        },
    },
    result: {
        data: {
            demos: [
                {
                    explanation: "Fake demo explanation",
                    buttonText: "View similar services",
                    customDescriptionPlaceholder:
                        "Custom description placeholder",
                    customExplanation: "Custom explanation",
                    customNamePlaceholder: "Custom name placeholder",
                    customTitle: "Fake custom organization title",
                },
            ],
        },
    },
};

jest.mock("axios");
jest.mock("react-google-places-autocomplete", () => {
    return {
        __esModule: true,
        A: true,
        default: () => {
            return <div>This is the autocomplete</div>;
        },
    };
});

describe("Demos", () => {
    it("Renders without error", async () => {
        const history = createMemoryHistory();
        history.push("/demo/fake");
        render(
            <MockedProvider mocks={[GET_DEMO_MOCK]} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Router history={history}>
                        <Demo
                            title="Service Title"
                            description="Service Description"
                        />
                    </Router>
                </LanguageContext.Provider>
            </MockedProvider>
        );
        Object(axios.post).mockResolvedValueOnce(servicesRes);

        // Content
        await screen.getByText("Service Title");
        await screen.getByText("Service Description");

        // View similar
        await waitFor(() => screen.getByText("View similar services"));
        const viewButton = await screen.getByText("View similar services");
        await fireEvent.click(viewButton);
        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        // Output
        await screen.getByText("Test Service One");
        await screen.getByText("Test Service Two");
    });
    it("Renders with error", async () => {
        const history = createMemoryHistory();
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Router history={history}>
                        <Demo
                            title="Service Title"
                            description="Service Description"
                        />
                    </Router>
                </LanguageContext.Provider>
            </MockedProvider>
        );

        await waitFor(() => screen.getByText("Content collection error..."));
    });
    describe("Custom Demo", () => {
        it("Renders without error", async () => {
            const history = createMemoryHistory();
            history.push("/demo/custom");
            render(
                <MockedProvider mocks={[GET_DEMO_MOCK]} addTypename={false}>
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <Router history={history}>
                            <Demo />
                        </Router>
                    </LanguageContext.Provider>
                </MockedProvider>
            );
            Object(axios.post).mockResolvedValueOnce(servicesRes);

            // Content
            await waitFor(() =>
                screen.getByText("Fake custom organization title")
            );
            await screen.getByText("View similar services");

            // Inputs
            const nameInput = await screen.getByPlaceholderText(
                "Custom name placeholder"
            );
            fireEvent.change(nameInput, { target: { value: "Service Name" } });
            const descInput = await screen.getByPlaceholderText(
                "Custom description placeholder"
            );
            fireEvent.change(descInput, { target: { value: "Service Desc" } });

            // View similar
            const viewButton = await screen.getByText("View similar services");
            await fireEvent.click(viewButton);
            await waitFor(() => expect(axios.post).toHaveBeenCalled());
            await screen.getByText("Test Service One");
            await screen.getByText("Test Service Two");
        });
        it("Renders with error", async () => {
            const history = createMemoryHistory();
            render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <Router history={history}>
                            <Demo />
                        </Router>
                    </LanguageContext.Provider>
                </MockedProvider>
            );
            Object(axios.post).mockResolvedValueOnce(servicesRes);

            await waitFor(() =>
                screen.getByText("Content collection error...")
            );
        });
    });
    describe("Demo Info", () => {
        it("Opens and closes", async () => {
            const history = createMemoryHistory();
            history.push("/demo/fake");
            render(
                <MockedProvider mocks={[GET_DEMO_MOCK]} addTypename={false}>
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <Router history={history}>
                            <Demo
                                title="Service Title"
                                description="Service Description"
                            />
                        </Router>
                    </LanguageContext.Provider>
                </MockedProvider>
            );

            const toggle = await screen.getByText("?");
            await fireEvent.click(toggle);
            await waitFor(() => screen.getByText("Fake demo explanation"));
            await expect(screen.queryByText("?")).toBeNull();
            await fireEvent.click(toggle);
            await waitFor(() =>
                expect(screen.queryByText("Fake demo explantion")).toBeNull()
            );
        });
    });
});
