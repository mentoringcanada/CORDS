import styled from "styled-components";

export const StyledSearchBar = styled.form`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0.5rem 0 0.5rem 0;
    input {
        transition: 0.3s border;
        border: 1px solid transparent;
        font-size: 0.75rem;
        padding: 0.7rem 2.5rem 0.7rem 0.7rem;
        border-radius: 2rem;
        width: 100%;
        box-shadow: 2px 2px 5px grey;
        :hover {
            border-color: #ccc;
        }
    }
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.9rem;
        width: 1.9rem;
        margin-left: -2.2rem;
        border-radius: 50%;
        background-color: var(--primary-color);
        box-shadow: 2px 2px 5px grey;
    }
`;
