import React from "react";
import { FaLink } from "react-icons/fa";
import { StyledInfo } from "../LargeService/LargeService.styles";
import {
    StyledSmallService,
    StyledLink,
    StyledDescription,
} from "./SmallService.styles";

interface Props {
    id: string;
    name: string;
    link: string;
    description: string;
    distance: number;
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
}

// Component
const SmallService = ({
    id,
    name,
    description,
    link,
    distance,
    setFocus,
}: Props) => {
    return (
        <StyledSmallService onClick={() => setFocus(Number(id))}>
            <h3 className="service-title">{name}</h3>
            <StyledLink
                href={link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                data-testid="small-link"
            >
                <FaLink />
            </StyledLink>
            <StyledInfo>
                {distance && (
                    <p className="info">
                        <strong>Distance: </strong>
                        {`${distance.toFixed(1)} km`}
                    </p>
                )}
            </StyledInfo>
            <StyledDescription
                dangerouslySetInnerHTML={{ __html: description }}
            ></StyledDescription>
        </StyledSmallService>
    );
};

export default SmallService;
