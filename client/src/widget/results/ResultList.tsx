// Import
import React, { ReactElement, useState } from "react";
import Result from "./Result";
import SpecificResult from "./SpecificResult";

// Props
interface Props {
    services: Service[] | null;
}

// Component
function ResultList({ services }: Props): ReactElement {
    const [focus, setFocus] = useState<number | null>(null);

    return (
        <>
            {focus ? (
                <SpecificResult id={focus} setFocus={setFocus} />
            ) : (
                services &&
                services.map((service) => (
                    <Result
                        key={service.item_id}
                        id={service.item_id}
                        name={service.name}
                        link={service.link}
                        description={service.description}
                        setFocus={setFocus}
                    />
                ))
            )}
        </>
    );
}

export default ResultList;