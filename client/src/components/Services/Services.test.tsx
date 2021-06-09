import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import ServicesOutput from "./ServicesOutput/ServicesOutput";
import "@testing-library/jest-dom/extend-expect";
import { servicesRes } from "../../helper/testData";
import Search from "../../pages/Search/SearchPage";
import LanguageContext from "../../helper/LanguageContext";
import { MockedProvider } from "@apollo/client/testing";
import { GET_LARGE_SERVICE, GET_SEARCH_FILTERS } from "../../helper/CMS";
import HelmetData from "../../helper/Helmet";

window.scrollTo = jest.fn();

const mocks = [
    {
        request: {
            query: GET_SEARCH_FILTERS,
            variables: {
                language: "en",
            },
        },
        result: {
            data: {
                searchFilters: [
                    {
                        label: "label1",
                        value: "lab1",
                    },
                    {
                        label: "label2",
                        value: "lab2",
                    },
                ],
            },
        },
    },
    {
        request: {
            query: GET_LARGE_SERVICE,
            variables: {
                language: "en",
            },
        },
        result: {
            data: {
                largeServices: [
                    {
                        address: "Address:",
                        distance: "Distance:",
                        phone: "Phone Number:",
                        viewMore: "View More",
                        directions: "Directions",
                        similar: "Similar",
                    },
                ],
            },
        },
    },
];

const secondRes = {
    data: {
        items: [
            {
                name: "Test Service Two",
                description: "This is the second fake service",
                item_id: "69797998",
                lat: 49.0,
                lng: -82.0,
                address: "30 Up Street",
                distance: 20,
                link: "google.com",
                description_fr: "french desc",
                nom: "french nom",
            },
            {
                name: "Test Service One",
                description: "This is the first fake service",
                item_id: "69797999",
                lat: 45.0,
                lng: -80.0,
                address: "20 Made Street",
                distance: 15,
                link: "www.google.com",
                description_fr: "french desc",
                nom: "french nom",
            },
        ],
    },
};

jest.mock("axios");

describe("Services", () => {
    describe("Service List", () => {
        it("Renders services", async () => {
            render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <ServicesOutput
                            serviceResults={{
                                services: servicesRes.data.items,
                                location: {
                                    lat: undefined,
                                    lng: undefined,
                                },
                            }}
                        />
                    </LanguageContext.Provider>
                </MockedProvider>
            );

            await screen.getByText("Test Service One");
            await screen.getByText("This is the first fake service");

            await screen.getByText("Test Service Two");
            await screen.getByText("This is the second fake service");

            const smallLink = await screen.getAllByRole("link")[0];
            await fireEvent.click(smallLink);
            await expect(smallLink.closest("a")).toHaveAttribute(
                "href",
                "www.google.com"
            );
        });
    });
    describe("Large Service", () => {
        it("Renders on click", async () => {
            render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <ServicesOutput
                            serviceResults={{
                                services: servicesRes.data.items,
                                location: {
                                    lat: undefined,
                                    lng: undefined,
                                },
                            }}
                        />
                    </LanguageContext.Provider>
                </MockedProvider>
            );
            Object(axios.post).mockResolvedValueOnce(servicesRes);

            // Click on service one
            const serviceOne = await screen.getByText("Test Service One");
            await fireEvent.click(serviceOne);

            await waitFor(() => expect(axios.post).toHaveBeenCalled());

            await expect(screen.getByTestId("large-title")).toHaveTextContent(
                "Test Service One"
            );
            await screen.getByText("This is the first fake service");

            await waitFor(() => screen.getByText("Address:"));
            await screen.getByText("View More");
            await screen.getByText("Directions");

            await screen.getByText("Similar");
            await screen.getByText("Test Service Two");
            await screen.getByText("This is the second fake service");

            const backButton = await screen.getByTestId("back-button");
            await fireEvent.click(backButton);
        });
        it("Renders with error", async () => {
            render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <ServicesOutput
                            serviceResults={{
                                services: servicesRes.data.items,
                                location: {
                                    lat: undefined,
                                    lng: undefined,
                                },
                            }}
                        />
                    </LanguageContext.Provider>
                </MockedProvider>
            );
            Object(axios.post).mockResolvedValueOnce(servicesRes);

            // Click on service one
            const serviceOne = await screen.getByText("Test Service One");
            await fireEvent.click(serviceOne);

            await waitFor(() => expect(axios.post).toHaveBeenCalled());

            await waitFor(() =>
                screen.getByText("Content collection error...")
            );
        });
    });
    test("Click into similar", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <ServicesOutput
                        serviceResults={{
                            services: servicesRes.data.items,
                            location: {
                                lat: undefined,
                                lng: undefined,
                            },
                        }}
                    />
                </LanguageContext.Provider>
            </MockedProvider>
        );
        Object(axios.post)
            .mockReturnValueOnce(servicesRes)
            .mockReturnValueOnce(secondRes);

        const serviceOne = await screen.getByText("Test Service One");
        await fireEvent.click(serviceOne);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        const similarService = await screen.getByText("Test Service Two");
        await fireEvent.click(similarService);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        await expect(screen.getByTestId("large-title")).toHaveTextContent(
            "Test Service Two"
        );
        await screen.getByText("Test Service One");
    });
});
