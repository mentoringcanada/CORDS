import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { GET_HOME_CONTENT } from "../../helper/CMS";
import LanguageContext from "../../helper/LanguageContext";
import Home from "./Home";

const GET_HOME_MOCK = {
    request: {
        query: GET_HOME_CONTENT,
        variables: {
            language: "en",
        },
    },
    result: {
        data: {
            homes: [
                {
                    introductionText: "Intro to cords",
                },
            ],
        },
    },
};

describe("Home", () => {
    it("Renders without error", async () => {
        render(
            <MockedProvider addTypename={false} mocks={[GET_HOME_MOCK]}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Home />
                </LanguageContext.Provider>
            </MockedProvider>
        );

        await waitFor(() => screen.getByText("Intro to cords"));
    });
    it("Renders with error", async () => {
        render(
            <MockedProvider addTypename={false} mocks={[]}>
                <LanguageContext.Provider value={{ language: "en" }}>
                    <Home />
                </LanguageContext.Provider>
            </MockedProvider>
        );
        await waitFor(() => screen.getByText("Content collection error..."));
    });
});
