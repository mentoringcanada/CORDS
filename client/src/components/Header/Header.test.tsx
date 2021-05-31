import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";
import LanguageContext from "../../helper/LanguageContext";
import { MockedProvider } from "@apollo/client/testing";
import { GET_NAV_CONTENT } from "../../helper/CMS";

const GET_NAV_MOCK = {
    request: {
        query: GET_NAV_CONTENT,
        variables: {
            language: "en",
        },
    },
    result: {
        data: {
            navLinks: [
                {
                    name: "Home",
                    route: null,
                },
                {
                    name: "Search",
                    route: "search",
                },
            ],
            demoPages: [
                {
                    shortName: "Food",
                    route: "food",
                },
            ],
        },
    },
};

describe("Header", () => {
    test("Renders", async () => {
        render(
            <MockedProvider mocks={[GET_NAV_MOCK]} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Router>
                        <Header />
                    </Router>
                </LanguageContext.Provider>
            </MockedProvider>
        );

        await screen.getByAltText("CORDS Title Logo");
        await waitFor(() => screen.getByText("Home"));
        await screen.getByText("Search");
        await screen.getByText("Demos");
    });
    it("Render with error", async () => {
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Router>
                        <Header />
                    </Router>
                </LanguageContext.Provider>
            </MockedProvider>
        );

        await waitFor(() => screen.getByText("Content collection error..."));
    });
    describe("Dropdown", () => {
        test("Demos dropdown menu opens and closes", async () => {
            const { debug } = render(
                <MockedProvider mocks={[GET_NAV_MOCK]} addTypename={false}>
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <Router>
                            <Header />
                        </Router>
                    </LanguageContext.Provider>
                </MockedProvider>
            );
            await expect(screen.queryByText("Food")).toBeNull();
            const dropdownButton = await screen.getByText("Demos");
            await fireEvent.click(dropdownButton);

            await waitFor(() => screen.getByText("Food"));

            await screen.getByAltText("CORDS Title Logo");
            await fireEvent.click(dropdownButton);

            const foodLink = await screen.queryByText("Food");
            await waitFor(() => expect(foodLink).toBeNull());
            debug();
        });
        test("Click link", async () => {
            render(
                <MockedProvider mocks={[GET_NAV_MOCK]} addTypename={false}>
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <Router>
                            <Header />
                        </Router>
                    </LanguageContext.Provider>
                </MockedProvider>
            );

            // const dropdownButton = await screen.getByText("Demos");
            // await fireEvent.click(dropdownButton);

            // await waitFor(() => screen.getByText("Food"));
            // const shelterButton = await screen.getByText("Shelter");
            // await fireEvent.click(shelterButton);
        });
    });
});
