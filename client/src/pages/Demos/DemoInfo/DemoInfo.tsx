import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { StyledContainer } from "../../../styles/StyledContainer";
import { StyledDemoInfo, StyledToggle } from "./DemoInfo.styles";

const DemoInfo = () => {
    const [open, setOpen] = useState(true);

    return (
        <StyledContainer>
            <StyledDemoInfo className={open ? "" : "closed"}>
                <h3>Demo Help</h3>
                <p>
                    Each demo represents a fictitious organization's website
                    with its name and description. On the website, you are able
                    to view similar organizations and find the right one for
                    your needs with inter-service connections.
                </p>
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
