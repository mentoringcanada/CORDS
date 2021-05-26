import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { StyledContainer } from "../../../styles/StyledContainer";
import { StyledDemoInfo, StyledToggle } from "./DemoInfo.styles";

interface Props {
    explanation: string;
}

const DemoInfo = ({ explanation }: Props) => {
    const [open, setOpen] = useState(true);

    return (
        <StyledContainer>
            <StyledDemoInfo className={open ? "" : "closed"}>
                <p>{explanation}</p>
            </StyledDemoInfo>
            <StyledToggle
                onClick={() => setOpen(!open)}
                data-testid="help-toggle"
            >
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
