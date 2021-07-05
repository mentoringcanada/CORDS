import { gql } from "@apollo/client/core";

export const GET_DEMO_CONTENT = gql`
    query ($language: String!) {
        demos(locale: $language) {
            explanation
            buttonText
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
        }
    }
`;

// Search Input
export const GET_SEARCH_INPUT_CONTENT = gql`
    query ($language: String!) {
        searches(locale: $language) {
            searchBarPlaceholder
            locationPlaceholder
            locationMenuText
        }
    }
`;
export const GET_SEARCH_BAR = gql`
    query ($language: String!) {
        searches(locale: $language) {
            searchBarPlaceholder
        }
    }
`;
export const GET_SEARCH_FILTERS = gql`
    query ($language: String!) {
        searches(locale: $language) {
            locationPlaceholder
            locationMenuText
        }
        searchFilters(locale: $language) {
            label
            value
        }
    }
`;

export const GET_SEARCH_STATE = gql`
    query ($language: String!) {
        searches(locale: $language) {
            noResultsState
            errorState
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

export const GET_LARGE_SERVICE = gql`
    query ($language: String!) {
        largeServices(locale: $language) {
            address
            distance
            phone
            viewMore
            directions
            similar
        }
    }
`;

export const GET_FEEDBACK = gql`
    query ($language: String!) {
        feedbacks(locale: $language) {
            openMessage
            title
            explanation
            textboxLabel
            sendButton
        }
    }
`;
