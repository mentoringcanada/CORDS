import styled from "styled-components";

export const StyledSearch = styled.div`
    margin: auto;
    padding: 2rem;
    margin-bottom: 2rem;
    max-width: 1200px;
    & > div {
        margin-bottom: 2rem;
        & > * {
            margin-bottom: 1rem;
        }
    }
    .search-container {
        height: 80vh;
    }
    @media only screen and (max-width: 768px) {
        padding: 1rem;
    }
`;
