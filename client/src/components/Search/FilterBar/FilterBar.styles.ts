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
            borderRadius: "1.2rem",
            transition: "0.3s border",
            border: "1px solid transparent",
            boxShadow: "1px 1px 3px grey",
            marginRight: left ? "0.6rem" : "",
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
    justify-content: left;
    margin-bottom: 0.8rem;
    width: 100%;
`;

export const StyledLocationSelect = styled.div`
    min-width: 7rem;
    width: 16rem;
`;

export const StyledDistanceSelect = styled.div`
    min-width: 5.2rem;
`;

export const StyledServicesFilter = styled.div`
    min-width: 5rem;
    width: 6.3rem;
`;
