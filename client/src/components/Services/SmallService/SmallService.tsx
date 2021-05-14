import React from "react";
// import { FaLink } from "react-icons/fa";
import { StyledSmallService } from "./SmallService.styles";

interface Props {
    id: string;
    name: string;
    link: string;
    description: string;
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
}

// Component
const SmallService = ({ id, name, description, link, setFocus }: Props) => {
    return (
        <StyledSmallService
            onClick={() => {
                setFocus(null);
                setFocus(Number(id));
            }}
        >
            <h3>{name}</h3>
            <div className="buttons">
                {/* <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FaLink />
                </a> */}
                {/* <button onClick={handleSelection}>
                    <FaSave />
                </button> */}
            </div>
            <p>{description}</p>
        </StyledSmallService>
    );
};

export default SmallService;
