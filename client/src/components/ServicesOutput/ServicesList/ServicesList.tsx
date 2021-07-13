import { getDescription, getName } from "../../../helper/Services";
import { Service } from "../../../types";
import PagesBar from "../PagesBar/PagesBar";
import SmallService from "../SmallService/SmallService";
import ServicesListLogic from "./ServicesList.logic";

interface Props {
    maxPages: number;
    services: Service[];
    type: string;
    handleSelect: (id: string) => void;
}

const ServicesList = ({ type, maxPages, services, handleSelect }: Props) => {
    const { language } = ServicesListLogic();

    return (
        <>
            {services.map((service) => (
                <SmallService
                    key={service.item_id}
                    id={service.item_id}
                    name={getName(service, language)}
                    link={service.link}
                    description={getDescription(service, language)}
                    distance={service.distance}
                    data-testid="small-service"
                    type={type}
                    handleSelect={handleSelect}
                />
            ))}
            {services.length > 0 && maxPages !== 1 && (
                <PagesBar maxPages={maxPages} />
            )}
        </>
    );
};

export default ServicesList;
