import { useContext, useEffect, useState } from "react";
import { getSelections, removeSelection } from "../../../helper/API";
import { Service } from "../../../types";
import SearchContext from "../SearchContext";

const SelectionsLogic = () => {
    const { search, setSearch } = useContext(SearchContext);
    const [services, setServices] = useState<Service[]>([]);

    const getServices = () => {
        if (search.filter === "proximity") {
            return services
                .concat()
                .sort((a: any, b: any) => a.distance - b.distance);
        } else {
            return services;
        }
    };

    const handleSelect = async (id: string) => {
        removeSelection(id)
            .then(() => {
                const newServices = services.filter((a) => a.item_id !== id);
                setServices(newServices);
            })
            .catch(() => {
                console.log("remove error");
                setSearch({ ...search, state: "error" });
            });
    };

    const useOnStartup = () => {
        useEffect(() => {
            getSelections()
                .then((res) => {
                    setServices(res.items);
                })
                .catch(() => {
                    setSearch({
                        ...search,
                        state: "error",
                    });
                });
        }, []);
    };

    return { services, useOnStartup, getServices, handleSelect };
};
export default SelectionsLogic;
