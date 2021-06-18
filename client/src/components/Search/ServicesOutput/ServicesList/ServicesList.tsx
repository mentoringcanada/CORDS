import React from "react";
import { getDescription, getName } from "../../../../helper/Services";
import { Service } from "../../../../types";
import PagesBar from "../../PagesBar/PagesBar";
import SmallService from "../SmallService/SmallService";
import ServicesListLogic from "./ServicesList.logic";

interface Props {
    services: Service[];
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
    type: string;
    handleServices: (page: number) => void;
    page: number;
    setPage?: React.Dispatch<React.SetStateAction<number>>;
    outputRef?: React.MutableRefObject<any> | undefined;
}

const ServicesList = ({
    services,
    setFocus,
    type,
    handleServices,
    page,
    setPage,
    outputRef,
}: Props) => {
    const { language, useOnPageChange } = ServicesListLogic(handleServices);
    useOnPageChange(page, outputRef);

    return (
        <>
            {services.map((service) => (
                <SmallService
                    key={service.item_id}
                    id={service.item_id}
                    name={getName(service, language)}
                    link={service.link}
                    description={getDescription(service, language)}
                    setFocus={setFocus}
                    distance={service.distance}
                    data-testid="small-service"
                    type={type}
                />
            ))}
            {services.length > 0 && setPage && (
                <PagesBar page={page} setPage={setPage} />
            )}
        </>
    );
};

export default ServicesList;
