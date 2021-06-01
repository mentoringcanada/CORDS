import React from "react";
import { Service } from "../../../types";
import SmallService from "../SmallService/SmallService";
import ServicesListLogic from "./ServicesList.logic";

interface Props {
    services: Service[];
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
}

const ServicesList = ({ services, setFocus }: Props) => {
    const { getName, getDescription } = ServicesListLogic();

    return (
        <>
            {services.map((service) => (
                <SmallService
                    key={service.item_id}
                    id={service.item_id}
                    name={getName(service)}
                    link={service.link}
                    description={getDescription(service)}
                    setFocus={setFocus}
                    distance={service.distance}
                    data-testid="small-service"
                />
            ))}
        </>
    );
};

export default ServicesList;
