// Import
import React from "react";
import styled from "styled-components";
import Result from "./Result";

const StyledSimilar = styled.div`
    border-radius: 3px;
    margin-top: 2rem;
    border: 2px solid var(--primary-color);
    .list {
        height: 15rem;
        overflow-y: scroll;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.4rem;
        width: 100%;
        height: 2rem;
        background-color: var(--primary-color);
        color: white;
    }
`;

interface Props {
    similar: Service[];
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
}

const Similar = ({ similar, setFocus }: Props) => {
    return (
        <StyledSimilar>
            <h3 className="header">Similar</h3>
            <div className="list">
                {similar.map((service) => (
                    <Result
                        key={service.item_id}
                        id={service.item_id}
                        name={service.name}
                        link={service.link}
                        description={service.description}
                        setFocus={setFocus}
                    />
                ))}
            </div>
        </StyledSimilar>
    );
};

export default Similar;
