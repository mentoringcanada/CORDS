import styled from "styled-components";

export const StyledNav = styled.nav`
    display: flex;
    justify-content: space-around;
    font-size: 1.1rem;
    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: 0.4rem 1rem;
        &.normlink {
            max-height: 100px;
            color: #ccc;
            margin: 0.2rem 0.5rem 0.2rem 0rem;
            :hover {
                color: #ddd;
                box-shadow: inset 0 -5px 1px -2px white;
            }
        }
    }
    @media only screen and (max-width: 768px) {
        display: none;
        position: absolute;
        top: 100%;
        height: 70px;
        width: 100%;
        background-color: #22262add;
        a {
            width: 50%;
            justify-content: center;
            &.normlink {
                margin: 0;
                :hover {
                    box-shadow: none;
                }
            }
        }
        &.open {
            display: flex;
        }
    }
`;

export const StyledBurgerButton = styled.div`
    cursor: pointer;
    display: none;
    align-items: center;
    font-size: 1.5rem;
    margin-right: 1rem;
    @media only screen and (max-width: 768px) {
        display: flex;
    }
`;
