import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";
import LanguageContext from "../../helper/LanguageContext";
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_NAV_CONTENT } from "../../helper/CMS";
import Nav from "./Nav/Nav";

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
            render(
                <MockedProvider mocks={[GET_NAV_MOCK]} addTypename={false}>
                    <LanguageContext.Provider value={{ language: "en" }}>
                        <Router>
                            <Header />
                        </Router>
                    </LanguageContext.Provider>
                </MockedProvider>
            );
            await expect(screen.queryByText("Food")).toBeNull;
            const dropdownButton = await screen.getByText("Demos");
            await fireEvent.click(dropdownButton);

            await waitFor(() => screen.getByText("Food"));

            const logo = await screen.getByAltText("CORDS Title Logo");
            await fireEvent.click(logo);

            const foodLink = await screen.queryByText("Food");
            await expect(foodLink).toBeNull;
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
