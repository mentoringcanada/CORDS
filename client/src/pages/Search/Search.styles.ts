import styled from "styled-components";

export const StyledSearch = styled.div`
    margin: auto;
    padding: 2rem;
    margin-bottom: 2rem;
    max-width: 1200px;
    & > * {
        margin-bottom: 1rem;
    }
    .search-container {
        height: 80vh;
    }
    .break {
        width: 100%;
        margin-bottom: 0rem !important;
        background-color: #ddd;
        border-radius: 1px;
        height: 2px;
    }
    @media only screen and (max-width: 768px) {
        padding: 0.7rem 0.6rem;
    }
`;

export const StyledTabs = styled.div`
    height: 2rem;
    padding: 0.35rem 0 0 0;
    a {
        font-size: 0.85rem;
        text-decoration: none;
        background-color: transparent;
        color: white;
        background-color: #888;
        padding: 0.5rem;
        &.left {
            border-radius: 0 0 0 3px;
        }
        &.right {
            border-radius: 0 0 3px 0;
        }
        &.active {
            background-color: var(--secondary-color);
        }
    }
`;
