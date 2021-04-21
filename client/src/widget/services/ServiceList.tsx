// Import
import React, { ReactElement } from "react";
import Service from "./Service";

// Props
interface Props {
    services: Service[] | null;
    setFocus: React.Dispatch<React.SetStateAction<number | null>>;
}

// Component
function ServiceList({ services, setFocus }: Props): ReactElement {
    return (
        <>
            {services ? (
                <>
                    {services.map((service) => (
                        <Service
                            key={service.item_id}
                            id={service.item_id}
                            name={service.name}
                            link={service.link}
                            description={service.description}
                            setFocus={setFocus}
                        />
                    ))}
                </>
            ) : (
                <button></button>
            )}
        </>
    );
}

export default ServiceList;
