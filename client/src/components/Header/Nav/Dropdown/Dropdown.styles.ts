import styled from "styled-components";

export const StyledDropdown = styled.div`
    position: relative;

    @media only screen and (max-width: 768px) {
        width: 50%;
        margin: 0;
        button {
            width: 100%;
            height: 70px;
            justify-content: center;
            margin: 0;
            span {
                margin: none;
            }
        }
        div {
            width: 100%;
        }
    }
`;

export const StyledDropdownButton = styled.button`
    display: flex;
    align-items: center;
    height: 90px;
    font-size: 1.1rem;
    font-weight: normal;
    padding: 0.5rem 1rem;
    color: #ccc;
    background-color: transparent;
    span {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.4rem;
        font-size: 1rem;
    }
    :hover {
        color: #ddd;
    }
`;

export const StyledDropdownMenu = styled.div`
    display: flex;
    position: absolute;
    top: 100%;
    background-color: #f9f9f9;
    margin-right: 0.5rem;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    flex-direction: column;
    a {
        color: #444;
        border-radius: 0;
        width: 100%;
        :hover {
            background-color: #ddd;
            color: #444;
            border: none;
        }
    }
    a.active {
        background-color: #ddd;
    }
`;
