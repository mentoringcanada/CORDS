import RecommendBox from "../../../components/ServicesOutput/RecommendBox/RecommendBox";
import ServicesList from "../../../components/ServicesOutput/ServicesList/ServicesList";
import SelectionsLogic from "./Selections.logic";

const Selections = () => {
    const { useOnStartup, getServices, suggestedSearches } = SelectionsLogic();
    useOnStartup();
    return (
        <>
            <RecommendBox suggestedSearches={suggestedSearches} />
            <ServicesList
                services={getServices()}
                type="selections"
                maxPages={1}
            />
        </>
    );
};

export default Selections;
