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
    height: 80px;
    font-size: 1.1rem;
    font-weight: normal;
    padding: 0.5rem 1rem;
    color: #ccc;
    background-color: transparent;
    svg {
        margin-left: 0.4rem;
    }
    :hover {
        color: #ddd;
    }
`;

export const StyledDropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    width: 100%;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    text-align: center;
    a {
        color: #444;
        width: 100%;
        :hover {
            background-color: #6d9cdb34;
            color: #444;
        }
    }
    a.active {
        color: white;
        background-color: var(--primary-color);
    }
`;
