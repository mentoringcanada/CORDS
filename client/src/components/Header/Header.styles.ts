import styled from "styled-components";

export const StyledHeader = styled.header`
    background-color: #22262a;
    position: relative;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    box-shadow: 0px 1px 5px grey;
    outline: 3px solid #ccc;
    .logo-link {
        display: flex;
        align-items: center;
        margin-left: 2rem;
        img {
            height: 2.6rem;
        }
    }
    .right {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .break {
            margin: 0 1rem 0 1rem;
            height: 55px;
            width: 2px;
            background-color: #ccc;
        }
    }
    @media only screen and (max-width: 768px) {
        .logo-link {
            margin-left: 0.5rem;
            height: 2.3rem;
        }
        .right {
            .break {
                margin: 0 0.3rem;
            }
        }
    }
`;
