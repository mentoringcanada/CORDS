import {
    geocodeByPlaceId,
    geocodeByLatLng,
} from "react-google-places-autocomplete";
import { useContext, useEffect, useState } from "react";
import { getLocalLocation } from "../../../helper/API";
import { useQuery } from "@apollo/client";
import SearchContext from "../SearchContext";
import LanguageContext from "../../../helper/LanguageContext";
import { GET_SEARCH_FILTERS } from "../../../helper/CMS";

const distanceSelectOptions = [
    { value: 1, label: "1km" },
    { value: 3, label: "3km" },
    { value: 5, label: "5km" },
    { value: 10, label: "10km" },
    { value: 25, label: "25km" },
    { value: 50, label: "50km" },
    { value: 100, label: "100km" },
];

const sortSelectOptions = [
    { value: "best", label: "Best Match" },
    { value: "proximity", label: "Proximity" },
];

const sortSelectOptionsFr = [
    { value: "best", label: "Meilleure correspondance" },
    { value: "proximity", label: "Proximité" },
];

const LocationBarLogic = () => {
    const { search, setSearch } = useContext(SearchContext);
    const [locationValue, setLocationValue] = useState<any>();
    const [sortValue, setSortValue] = useState<any>();

    const setValueLocation = async (location: Location) => {
        const res = await geocodeByLatLng(location);
        setLocationValue({
            value: {
                place_id: res[0].place_id,
            },
            label: res[0].formatted_address,
        });
    };

    // Gets local location when location bar renders
    const useSetState = () => {
        useEffect(() => {
            const setLocation = async () => {
                if (search.location.lat && search.location.lng) {
                    setValueLocation(search.location);
                } else {
                    const localLocation: any = await getLocalLocation();
                    setSearch({
                        ...search,
                        location: localLocation,
                    });
                    setValueLocation(localLocation);
                }
            };
            setLocation();
        }, []);
    };

    const useLocationChange = (geoInputLocation: any) => {
        useEffect(() => {
            const setLocationContext = async () => {
                const res = await geocodeByPlaceId(
                    geoInputLocation.value.place_id
                );
                setSearch({
                    ...search,
                    location: {
                        lat: res[0].geometry.location.lat(),
                        lng: res[0].geometry.location.lng(),
                    },
                });
            };
            geoInputLocation && setLocationContext();
        }, [geoInputLocation]);
    };

    // Distance
    const handleDistanceChange = (distanceValue: any) => {
        setSearch({
            ...search,
            distance: distanceValue.value,
        });
    };

    // Filter
    const handleFilterChange = (filter: any) => {
        setSortValue(filter);
        setSearch({
            ...search,
            filter: filter.value,
        });
    };

    const useOnLanguageChange = (language: string) => {
        useEffect(() => {
            language === "fr-CA"
                ? setSortValue(sortSelectOptionsFr[0])
                : setSortValue(sortSelectOptions[0]);
            setSearch({
                ...search,
                filter: "best",
            });
        }, [language]);
    };

    const changeToSelections = () => {
        setSearch({ ...search, state: "selections" });
    };

    const getFilterLabel = () => {
        if (language === "fr-CA") {
            return sortSelectOptionsFr.find(
                (e: any) => e.value === search.filter
            );
        } else {
            return sortSelectOptions.find(
                (e: any) => e.value === search.filter
            );
        }
    };

    // Text content
    const { language } = useContext(LanguageContext);
    const { error, data } = useQuery(GET_SEARCH_FILTERS, {
        variables: { language },
    });

    const searchFilters = data ? data.searchFilters : [];
    const searchBar = data ? data.searches[0] : [];

    return {
        search,
        locationValue,
        setLocationValue,
        useLocationChange,
        useSetState,
        handleDistanceChange,
        handleFilterChange,
        distanceSelectOptions,
        searchFilters,
        searchBar,
        error,
        language,
        useOnLanguageChange,
        sortValue,
        changeToSelections,
        getFilterLabel,
    };
};

export default LocationBarLogic;
