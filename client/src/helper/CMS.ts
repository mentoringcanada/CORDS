import { gql } from "@apollo/client/core";

export const GET_DEMO_CONTENT = gql`
    query ($language: String!) {
        demos(locale: $language) {
            explanation
            buttonText
            infoCloseText
            infoOpenText
        }
    }
`;

export const GET_CUSTOM_DEMO_CONTENT = gql`
    query ($language: String!) {
        demos(locale: $language) {
            customTitle
            customExplanation
            buttonText
            customNamePlaceholder
            customDescriptionPlaceholder
            infoCloseText
            infoOpenText
        }
    }
`;

export const GET_SEARCH_INPUT_CONTENT = gql`
    query ($language: String!) {
        searches(locale: $language) {
            searchBarPlaceholder
            locationPlaceholder
            distancePlaceholder
        }
    }
`;

export const GET_HOME_CONTENT = gql`
    query ($language: String!) {
        homes(locale: $language) {
            introductionText
        }
    }
`;

export const GET_NAV_CONTENT = gql`
    query ($language: String!) {
        navLinks(locale: $language) {
            name
            route
        }
        demoPages(locale: $language) {
            shortName
            route
        }
    }
`;

export const GET_WIDGET_CONTENT = gql`
    query ($language: String!) {
        widgets(locale: $language) {
            triggerButtonText
        }
    }
`;

export const GET_DEMO_PAGES = gql`
    query ($language: String!) {
        demoPages(locale: $language) {
            route
            description
            name
        }
    }
`;
