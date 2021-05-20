import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { StyledContainer } from "../../../styles/StyledContainer";
import { StyledDemoInfo, StyledToggle } from "./DemoInfo.styles";

interface Props {
    title: string;
    description: string;
}

const DemoInfo = ({ title, description }: Props) => {
    const [open, setOpen] = useState(true);

    return (
        <StyledContainer>
            <StyledDemoInfo className={open ? "" : "closed"}>
                <h3>{title}</h3>
                <p>{description}</p>
            </StyledDemoInfo>
            <StyledToggle onClick={() => setOpen(!open)}>
                {open ? (
                    <div>
                        Hide <FaAngleUp />
                    </div>
                ) : (
                    <div>
                        Help <FaAngleDown />
                    </div>
                )}
            </StyledToggle>
        </StyledContainer>
    );
};

export default DemoInfo;
