import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { MockedProvider } from "@apollo/client/testing";
import { servicesRes } from "../../helper/testData";
import CustomDemo from "./CustomDemo/CustomDemo";
import Demo from "./Demo";
import { GET_CUSTOM_DEMO_CONTENT, GET_DEMO_CONTENT } from "../../helper/CMS";
import LanguageContext from "../../helper/LanguageContext";

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
                },
            ],
        },
    },
};
const GET_CUSTOM_DEMO_MOCK = {
    request: {
        query: GET_CUSTOM_DEMO_CONTENT,
        variables: {
            language: "en",
        },
    },
    result: {
        data: {
            demos: [
                {
                    customExplanation: "Fake custom demo explanation",
                    buttonText: "View similar services",
                    customTitle: "Fake title",
                    customNamePlaceholder: "Fake name placeholder",
                    customDescriptionPlaceholder:
                        "Fake description placeholder",
                },
            ],
        },
    },
};

jest.mock("axios");

describe("Demos", () => {
    it("Renders without error", async () => {
        render(
            <MockedProvider mocks={[GET_DEMO_MOCK]} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Demo
                        title="Service Title"
                        description="Service Description"
                    />
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
        await screen.getByTestId("output-container");
        await screen.getByText("Test Service One");
        await screen.getByText("Test Service Two");
    });
    it("Renders with error", async () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Demo
                        title="Service Title"
                        description="Service Description"
                    />
                </LanguageContext.Provider>
            </MockedProvider>
        );

        await waitFor(() => screen.getByText("Content collection error..."));
    });
    describe("Custom Demo", () => {
        it("Renders without error", async () => {
            render(
                <MockedProvider
                    mocks={[GET_CUSTOM_DEMO_MOCK]}
                    addTypename={false}
                >
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <CustomDemo />
                    </LanguageContext.Provider>
                </MockedProvider>
            );
            Object(axios.post).mockResolvedValueOnce(servicesRes);

            // Content
            await waitFor(() => screen.getByText("Fake title"));
            await screen.getByText("View similar services");

            // Inputs
            const nameInput = await screen.getByPlaceholderText(
                "Fake name placeholder"
            );
            fireEvent.change(nameInput, { target: { value: "Service Name" } });
            const descInput = await screen.getByPlaceholderText(
                "Fake description placeholder"
            );
            fireEvent.change(descInput, { target: { value: "Service Desc" } });

            // View similar
            const viewButton = await screen.getByText("View similar services");
            await fireEvent.click(viewButton);
            await waitFor(() => expect(axios.post).toHaveBeenCalled());
            await screen.getByTestId("output-container");
            await screen.getByText("Test Service One");
            await screen.getByText("Test Service Two");
        });
        it("Renders with error", async () => {
            render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <CustomDemo />
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
            render(
                <MockedProvider mocks={[GET_DEMO_MOCK]} addTypename={false}>
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <Demo
                            title="Service Title"
                            description="Service Description"
                        />
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
