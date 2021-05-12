import DemoLogic from "./Demo.logic";
import OutputBox from "../../components/OutputBox/OutputBox";
import ServiceList from "../../components/Services/ServiceList/ServiceList";
import LargeService from "../../components/Services/LargeService/LargeService";
import StyledDemo from "./Demo.styles";

interface Props {
    description: string;
    title: string;
}

const DemoClothing = ({ description, title }: Props) => {
    const { similar, focus, setFocus, handleSimilar } = DemoLogic();

    return (
        <StyledDemo>
            <h2 className="demo">{title}</h2>
            <p className="demo">{description}</p>
            <button className="demo" onClick={() => handleSimilar(description)}>
                View similar services
            </button>
            {similar && similar.length !== 0 && (
                <OutputBox>
                    {focus ? (
                        <LargeService id={focus} setFocus={setFocus} />
                    ) : (
                        <ServiceList services={similar} setFocus={setFocus} />
                    )}
                </OutputBox>
            )}
        </StyledDemo>
    );
};

export default DemoClothing;
