const ServicesFilterLogic = () => {
    const filterOptions = [
        {
            value: "best",
            label: "Best Match",
        },
        {
            value: "proximity",
            label: "Proximity",
        },
    ];
    return { filterOptions };
};

export default ServicesFilterLogic;
