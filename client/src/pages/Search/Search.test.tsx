import {
    render,
    screen,
    fireEvent,
    waitFor,
    act,
} from "@testing-library/react";
import axios from "axios";
import { MockedProvider } from "@apollo/client/testing";
import LanguageContext from "../../helper/LanguageContext";
import Search from "./Search";
import {
    GET_FEEDBACK,
    GET_LARGE_SERVICE,
    GET_SEARCH_BAR,
    GET_SEARCH_FILTERS,
} from "../../helper/CMS";
import { serviceRes, servicesRes, similarRes } from "../../helper/testData";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

window.scrollTo = jest.fn();

// Mocks
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
                searches: [
                    {
                        locationPlaceholder: "locationPlaceholder",
                        locationMenuText: "locationMenuText",
                    },
                ],
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
    {
        request: {
            query: GET_SEARCH_BAR,
            variables: {
                language: "en",
            },
        },
        result: {
            data: {
                searches: [
                    {
                        searchBarPlaceholder: "How can we help?",
                    },
                ],
            },
        },
    },
    {
        request: {
            query: GET_FEEDBACK,
            variables: {
                language: "en",
            },
        },
        result: {
            data: {
                feedbacks: [
                    {
                        openMessage: "openMessage",
                        title: "Title",
                        explanation: "explanation",
                        textboxLabel: "textboxLabel",
                        sendButton: "sendButton",
                    },
                ],
            },
        },
    },
];

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
describe("Search", () => {
    it("Renders", async () => {
        const history = createMemoryHistory();
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Router history={history}>
                        <Search />
                    </Router>
                </LanguageContext.Provider>
            </MockedProvider>
        );

        // Requests
        Object(axios.post)
            .mockReturnValueOnce(servicesRes) // search
            .mockReturnValueOnce([]) // Feedback
            .mockReturnValueOnce(similarRes) // large service, service
            .mockReturnValueOnce(similarRes); // large service, similar

        // Content
        await waitFor(() => screen.getByPlaceholderText("How can we help?"));
        screen.getByText("50km");
        screen.getByText("Best Match");
        screen.getByText("This is the autocomplete");

        // Search
        const searchBarButton = await screen.findByTestId("search-button");
        await fireEvent.click(searchBarButton);
        history.push(
            "/search/results?ln=en&query=food&distance=50&lat=43.6603986&lng=-79.4551295&filter=best&page=1"
        );

        // Output
        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        await screen.getByText("Test Service One");
        await screen.getByText("15.0 km");

        await screen.getByText("Test Service Two");
        await screen.getByText("20.0 km");

        await screen.getAllByText("Distance:");

        // Feedback
        await screen.getAllByText("openMessage");
        const feedbackButton = await screen.getAllByText("!");
        await fireEvent.click(feedbackButton[0]);

        await waitFor(() => screen.getByText("Title"));
        await screen.getByText("explanation");
        await screen.getByText("textboxLabel");
        await screen.getByText("sendButton");

        const sendButton = await screen.getByText("sendButton");
        await fireEvent.click(sendButton);

        // Large Service
        const serviceOne = await screen.findByText("Test Service One");
        await act(async () => {
            await fireEvent.click(serviceOne);
            history.replace(
                "/search/service/69797743?query=food&distance=50&lat=43.6603986&lng=-79.4551295&filter=best&page=1"
            );
        });
        // Output
        await screen.getByText("Large Service");
        await screen.getByText("Address:");
        await screen.getByText("20 Made Street");
        await screen.getAllByText("Distance:");
        await screen.getByText("15.0 km");
        await screen.getByText("Phone Number:");
        await screen.getByText("416-555-5555");
        await screen.getByText("Similar");
        await screen.getByText("Similar Service One");
    });
    it("Renders with error", async () => {
        const history = createMemoryHistory();
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Router history={history}>
                        <Search />
                    </Router>
                </LanguageContext.Provider>
            </MockedProvider>
        );

        await waitFor(() => screen.getByText("Content collection error..."));
    });
});
