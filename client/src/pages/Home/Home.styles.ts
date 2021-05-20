import styled from "styled-components";

export const StyledHome = styled.div`
    margin: auto;
    padding: 2rem;
    margin-bottom: 2rem;
    max-width: 1200px;
    & > div {
        margin-bottom: 2rem;
        & > p {
            margin-top: 0.5rem;
            line-height: 1.2rem;
        }
        & > h3 {
            margin-top: 1rem;
        }
    }
    @media only screen and (max-width: 768px) {
        padding: 1rem;
    }
`;
