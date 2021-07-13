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

export const StyledFilterBar = styled.div`
    display: flex;
    justify-content: left;
    margin-bottom: 0.8rem;
    max-width: 100%;
    flex-wrap: wrap;
    @media only screen and (max-width: 768px) {
        margin-bottom: 0.7rem;
    }
`;

export const StyledLocationSelect = styled.div`
    min-width: 5rem;
    width: 16rem;
    margin-top: 0.4rem;
`;

export const StyledDistanceSelect = styled.div`
    min-width: 5rem;
    margin-top: 0.4rem;
`;

export const StyledServicesFilter = styled.div`
    margin-top: 0.4rem;
    min-width: 5rem;
    width: 6.3rem;
`;
