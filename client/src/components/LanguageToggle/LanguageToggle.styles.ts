import styled from "styled-components";

export const StyledLanguageToggle = styled.button`
    color: #ccc;
    background-color: transparent;
    font-size: 1rem;
    padding: 0.5rem;
    margin: 1rem;
    font-weight: normal;
    :hover {
        text-decoration: underline;
    }
    @media only screen and (max-width: 500px) {
        margin: 0rem;
    }
`;
