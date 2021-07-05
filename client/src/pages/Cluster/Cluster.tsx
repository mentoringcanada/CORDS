import { useEffect, useState } from "react";
import { getCluster, getClusters } from "../../helper/API";
import { StyledCluster } from "./Cluster.styles";

const Cluster = () => {
    const [clusters, setClusters] = useState([]);
    const [clusterId, setClusterId] = useState<number>(0);

    useEffect(() => {
        getClusters().then((res) => setClusters(res));
    }, []);
    return (
        <StyledCluster>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    getCluster(clusterId);
                }}
            >
                This component displays the titles of the contents of one
                cluster.
                <input
                    type="number"
                    onChange={(e) => setClusterId(Number(e.target.value))}
                    value={clusterId}
                />
                <button type="submit">Search</button>
            </form>
        </StyledCluster>
    );
};

export default Cluster;
