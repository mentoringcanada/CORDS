import ServicesList from "../../../components/ServicesOutput/ServicesList/ServicesList";
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
        />
    );
};

export default ServiceResults;
