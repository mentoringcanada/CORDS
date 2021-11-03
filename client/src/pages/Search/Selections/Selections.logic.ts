import { useContext, useEffect, useState } from "react";
import { getSelections } from "../../../helper/API";
import { Service } from "../../../types";
import SearchContext from "../SearchContext";

const SelectionsLogic = () => {
    const { search, setSearch } = useContext(SearchContext);
    const [services, setServices] = useState<Service[]>([]);
    const [suggestedSearches, setSuggestedSearches] = useState([]);

    const getServices = () => {
        if (search.filter === "proximity") {
            return services
                .concat()
                .sort((a: any, b: any) => a.distance - b.distance);
        } else {
            return services;
        }
    };

    // const handleSelect = async (id: string) => {
    //     removeSelection(id)
    //         .then(() => {
    //             const newServices = services.filter((a) => a.item_id !== id);
    //             setServices(newServices);
    //         })
    //         .catch(() => {
    //             console.log("remove error");
    //             setSearch({ ...search, state: "error" });
    //         });
    // };

    const useOnStartup = () => {
        useEffect(() => {
            if (search.historyLog.length > 0) {
                setSearch({ ...search, state: "searching" });
                getSelections(search, search.dataSource)
                    .then((res) => {
                        if (Array.isArray(res) && !res.length) {
                            setSearch({
                                ...search,
                                state: "no-results",
                            });
                        } else {
                            setSearch({
                                ...search,
                                state: "",
                            });
                            setSuggestedSearches(res.suggestedSearches);
                            setServices(res.items);
                        }
                    })
                    .catch(() => {
                        setSearch({
                            ...search,
                            state: "error",
                        });
                    });
            } else {
                setSearch({ ...search, state: "no-results" });
            }
        }, []);
    };

    return { services, useOnStartup, getServices, suggestedSearches };
};
export default SelectionsLogic;
