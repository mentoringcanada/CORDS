import React from "react";
import { MdClose } from "react-icons/md";
import DemoInfoLogic from "./DemoInfo.logic";
import { StyledDemoInfo, StyledToggle } from "./DemoInfo.styles";

interface Props {
    explanation: string;
}

const DemoInfo = ({ explanation }: Props) => {
    const { open, setOpen } = DemoInfoLogic();

    return (
        <StyledDemoInfo className={open ? "" : "closed"}>
            <p>{explanation}</p>
            <StyledToggle
                onClick={() => setOpen(!open)}
                data-testid="help-toggle"
            >
                {open ? <MdClose /> : "?"}
            </StyledToggle>
        </StyledDemoInfo>
    );
};

export default DemoInfo;
