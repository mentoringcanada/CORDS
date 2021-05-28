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
        background-color: #ddd;
        border-radius: 1px;
        height: 2px;
    }
    @media only screen and (max-width: 768px) {
        padding: 1rem;
    }
`;
