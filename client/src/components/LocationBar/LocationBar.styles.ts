import styled from "styled-components";

export const SelectStyles = (left: boolean) => {
    return {
        container: (provided: any) => ({
            ...provided,
            fontFamily: "var(--secondary-font), Arial",
            fontSize: "0.75rem",
            color: "#222222",
        }),
        control: (provided: any) => ({
            ...provided,
            borderRadius: "1rem",
            transition: "0.3s border",
            border: "1px solid transparent",
            boxShadow: "1px 1px 3px grey",
            marginRight: left ? "0.4rem" : "",
            "&:hover": { borderColor: "#aaa" },
        }),
        option: (styles: any, state: any) => ({
            ...styles,
            backgroundColor: state.isSelected
                ? "var(--primary-color)"
                : styles.backgroundColor,
        }),
    };
};

export const StyledLocationBar = styled.div`
    display: flex;
    margin-bottom: 0.8rem;
    max-width: 20rem;
`;

export const StyledLocationSelect = styled.div`
    flex: 4;
    border-radius: 3px 0 0 0;
`;

export const StyledDistanceSelect = styled.div`
    border-radius: 0 3px 0 0;
    flex: 2;
    input {
        width: 100%;
        height: 100%;
        padding: 2px 8px;
        font-family: var(--secondary-font), Arial;
        font-size: 0.8rem;
    }
`;
