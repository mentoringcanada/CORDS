import React, { ReactElement } from "react";
import SmallService from "../SmallService/SmallService";
import { Service } from "../../../types";

interface Props {
    services: Service[] | null;
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
}

function ServiceList({ services, setFocus }: Props): ReactElement {
    return (
        <>
            {services &&
                services.map((service) => (
                    <SmallService
                        key={service.item_id}
                        id={service.item_id}
                        name={service.name}
                        link={service.link}
                        description={service.description}
                        setFocus={setFocus}
                    />
                ))}
        </>
    );
}

export default ServiceList;
