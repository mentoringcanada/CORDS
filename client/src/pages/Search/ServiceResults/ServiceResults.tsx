import ServicesList from "../../../components/ServicesOutput/ServicesList/ServicesList";
import { addSelection } from "../../../helper/API";
import ServiceResultsLogic from "./ServiceResults.logic";

const ServiceResults = () => {
    const { maxPages, getServices, useSetState, params } =
        ServiceResultsLogic();
    useSetState(
        params.distance,
        params.lat,
        params.lng,
        params.page,
        params.query
    );

    return (
        <ServicesList
            type="search"
            services={getServices()}
            maxPages={maxPages}
            handleSelect={(id: string) =>
                addSelection(id).catch(() =>
                    console.log("Error adding selection")
                )
            }
        />
    );
};

export default ServiceResults;
