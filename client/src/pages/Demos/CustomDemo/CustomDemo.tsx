import OutputBox from "../../../components/OutputBox/OutputBox";
import ServiceList from "../../../components/Services/ServiceList/ServiceList";
import LargeService from "../../../components/Services/LargeService/LargeService";
import { MdEdit } from "react-icons/md";
import DemoLogic from "../Demo.logic";
import CustomDemoLogic from "./CustomDemo.logic";
import DemoStyles from "../Demo.styles";
import { StyledPageContainer } from "../../PageContainer.styles";

const CustomDemo = () => {
    const { similar, focus, setFocus, handleSimilar, useHandleDemoChange } =
        DemoLogic();
    const { description, title, handleDescriptionChange, handleTitleChange } =
        CustomDemoLogic();
    useHandleDemoChange("");

    return (
        <StyledPageContainer>
            <DemoStyles>
                <label className="demo title">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={handleTitleChange}
                        style={{ width: !title ? "6rem" : "100%" }}
                    />
                    {!title && <MdEdit />}
                </label>
                <label className="demo desc">
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                        style={{ width: !description ? "6rem" : "100%" }}
                    />
                    {!title && <MdEdit />}
                </label>
                <button
                    className="demo"
                    onClick={() => handleSimilar(description)}
                >
                    View similar services
                </button>
                {similar && similar.length !== 0 && (
                    <OutputBox>
                        {focus ? (
                            <LargeService id={focus} setFocus={setFocus} />
                        ) : (
                            <ServiceList
                                services={similar}
                                setFocus={setFocus}
                            />
                        )}
                    </OutputBox>
                )}
            </DemoStyles>
        </StyledPageContainer>
    );
};

export default CustomDemo;
