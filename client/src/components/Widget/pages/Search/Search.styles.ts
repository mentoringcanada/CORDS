import styled from "styled-components";

export const StyledSearch = styled.div`
    padding: 0.5rem;
    height: 100%;
    overflow: auto;
    .break {
        margin: 0.8rem 0 0.2rem 0 !important;
        width: 100%;
        background-color: #ddd;
        border-radius: 1px;
        height: 2px;
    }
    & > * {
        margin-bottom: 0.7rem;
    }
`;
