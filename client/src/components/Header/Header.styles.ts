import styled from "styled-components";

export const StyledHeader = styled.header`
    background-color: #22262a;
    position: relative;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 90px;
    h2 {
        font-size: 1.7rem;
        margin-left: 2rem;
    }
    @media only screen and (max-width: 500px) {
        h2 {
            font-size: 8vw;
            margin-left: 1rem;
        }
    }
`;
