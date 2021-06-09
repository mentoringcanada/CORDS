import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import ServicesOutput from "./ServicesOutput/ServicesOutput";
import "@testing-library/jest-dom/extend-expect";
import { servicesRes } from "../../helper/testData";
import Search from "../../pages/Search/SearchPage";
import LanguageContext from "../../helper/LanguageContext";
import { MockedProvider } from "@apollo/client/testing";
import { GET_SEARCH_FILTERS } from "../../helper/CMS";
import HelmetData from "../../helper/Helmet";

window.scrollTo = jest.fn();

const GET_SEARCH_FILTERS_MOCK = {
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
};

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
    test("ServiceList renders services", async () => {
        render(
            <MockedProvider
                mocks={[GET_SEARCH_FILTERS_MOCK]}
                addTypename={false}
            >
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
    it("Clicks in-out of service", async () => {
        render(
            <MockedProvider
                mocks={[GET_SEARCH_FILTERS_MOCK]}
                addTypename={false}
            >
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

        const serviceOne = await screen.getByText("Test Service One");
        await fireEvent.click(serviceOne);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        await expect(screen.getByTestId("large-title")).toHaveTextContent(
            "Test Service One"
        );
        await screen.getByText("Address:");
        await screen.getByText("Phone Number:");
        await screen.getByText("This is the first fake service");

        await screen.getByText("View More");
        await screen.getByText("Directions");

        await screen.getByText("Similar");
        await screen.getByText("Test Service Two");
        await screen.getByText("This is the second fake service");

        const backButton = await screen.getByTestId("back-button");
        await fireEvent.click(backButton);

        await expect(screen.queryByText("Address:")).toBeNull();
        await expect(screen.queryByText("Phone Number:")).toBeNull();
        await expect(screen.queryByText("View More")).toBeNull();
        await expect(screen.queryByText("Directions")).toBeNull();
        await expect(screen.queryByText("Similar")).toBeNull();
    });
    test("Click into similar", async () => {
        render(
            <MockedProvider
                mocks={[GET_SEARCH_FILTERS_MOCK]}
                addTypename={false}
            >
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
    test("Full use and state", async () => {
        render(
            <MockedProvider
                mocks={[GET_SEARCH_FILTERS_MOCK]}
                addTypename={false}
            >
                <HelmetData />
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Search />
                </LanguageContext.Provider>
            </MockedProvider>
        );
        Object(axios.post)
            .mockReturnValueOnce(servicesRes)
            .mockReturnValueOnce(secondRes);

        const searchButton = await screen.getByTestId("search-button");
        await fireEvent.click(searchButton);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        const serviceOne = await screen.getByText("Test Service One");
        await fireEvent.click(serviceOne);

        await waitFor(() => expect(axios.post).toHaveBeenCalled());
        await screen.getByText("Test Service One");
    });
});
