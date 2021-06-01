import styled from "styled-components";

export const FilterStyles = () => {
    return {
        container: (provided: any) => ({
            ...provided,
            fontFamily: "var(--secondary-font), Arial",
            fontSize: "0.8rem",
            color: "#222222",
            width: "6.5rem",
            marginRight: "0.5rem",
        }),
        control: (provided: any) => ({
            ...provided,
            transition: "0.3s border",
            border: "1px solid transparent",
            boxShadow: "1px 1px 3px grey",
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

export const StyledServicesFilter = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 0.6rem;
`;
