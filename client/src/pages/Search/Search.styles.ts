import styled from "styled-components";

export const StyledSearch = styled.div`
    margin: auto;
    padding: 2rem;
    margin-bottom: 2rem;
    max-width: 1200px;
    & > div {
        margin-bottom: 2rem;
        & > form {
            margin-bottom: 1rem;
        }
    }
    .search-output {
        height: 55vh;
    }
    @media only screen and (max-width: 768px) {
        padding: 1rem;
    }
`;
