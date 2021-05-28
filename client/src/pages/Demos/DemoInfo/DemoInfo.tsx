import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { StyledContainer } from "../../../styles/StyledContainer";
import DemoInfoLogic from "./DemoInfo.logic";
import { StyledDemoInfo, StyledToggle } from "./DemoInfo.styles";

interface Props {
    explanation: string;
    openText: string;
    closeText: string;
}

const DemoInfo = ({ explanation, openText, closeText }: Props) => {
    const { open, setOpen } = DemoInfoLogic();

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
                        {closeText}
                        <FaAngleUp />
                    </div>
                ) : (
                    <div>
                        {openText}
                        <FaAngleDown />
                    </div>
                )}
            </StyledToggle>
        </StyledContainer>
    );
};

export default DemoInfo;
