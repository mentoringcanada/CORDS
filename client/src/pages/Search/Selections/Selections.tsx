import ServicesList from "../../../components/ServicesOutput/ServicesList/ServicesList";
import SelectionsLogic from "./Selections.logic";

const Selections = () => {
    const { useOnStartup, getServices } = SelectionsLogic();
    useOnStartup();
    return (
        <ServicesList services={getServices()} type="selections" maxPages={1} />
    );
};

export default Selections;
