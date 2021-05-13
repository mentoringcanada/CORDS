import styled from "styled-components";

export const SelectStyles = (left: boolean) => {
    return {
        container: (provided: any) => ({
            ...provided,
            fontFamily: "var(--secondary-font), Arial",
            fontSize: "0.8rem",
            color: "#222222",
        }),
        control: (provided: any) => ({
            ...provided,
            borderRadius: left ? "3px 0 0 0" : "0 3px 0 0",
            "&:hover": { borderColor: "#aaa" },
            border: "1px solid #ccc",
            boxShadow: "none",
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
`;
