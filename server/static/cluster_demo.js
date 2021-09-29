const state = {
    clusters: [],
    recommendations: [],
    currentCluster: {},
    selectedAgencies: [],
    searchedAgencies: [],
};

// startup functions
const loadClusters = () => {
    fetch("/clusters")
        .then(data => data.json())
        .then(json => json.clusters)
        .then(clusters => {
            state.clusters = clusters;
            return [];
        })
        .then(paintClusters);
};

const paintClusters = (selectedClusters = []) => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    state.clusters.forEach(cluster => paintCluster(cluster, context, selectedClusters))
};

const attachSelectClusterOnEnterEvent = () => {
    document.getElementById("clusterIdInput")
        .addEventListener("keyup", function (event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                selectClusterClick();
            }
        });
}

const setCurrentCluster = (clusterId) => {
    return fetch("/cluster?clusterId=" + clusterId)
        .then(data => data.json())
        .then(data => {
            state.currentCluster = data;
        });
};

const search = () => {
    const query = document.getElementById('searchText').value;
    return fetch('/search', {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: { "Content-Type": "application/json; charset=utf-8" }
    })
        .then(res => res.json())
        .then(data => {
            state.searchedAgencies = data.items;

        })
        .then(displayAgencies);
};

const displayAgencies = () => {
    const container = document.getElementById('agencies');
    container.innerHTML = '';
    text = '';
    state.searchedAgencies.forEach(agency => {
        text += agencyView(agency);
    });
    container.innerHTML = text;
};

const fetchRecommendationsUsingSelections = (services) => {
    const servicesList = services.map(agency=>agency.item_id);
    return fetch("/selections", {
        method: 'POST',
        body: JSON.stringify({ services: servicesList }),
        headers: { "Content-Type": "application/json; charset=utf-8" }
    }).then(res => res.json());
};

const addSelection = (data) => {
    const agencyId = data["item_id"]
    let contained = false;
    for (let i = 0; i < state.selectedAgencies.length; i++) {
        if (state.selectedAgencies[i]["item_id"] === agencyId) {
            contained = true;
            break
        }
    }
    if (!contained) {
        state.selectedAgencies.push(data);
    }
    updateSelectionsUi();
    updateRecommendations();
};

const updateRecommendations = () => {
    fetchRecommendationsUsingSelections(state.selectedAgencies)
        .then(data => {
            state.recommendations = data.clusters;
        })
        .then(updateRecommendationsUi);
};

const removeSelection = (agency_id) => {
    for (let i = state.selectedAgencies.length - 1; i >= 0; i--) {
        if (state.selectedAgencies[i]["item_id"] === agency_id) {
            state.selectedAgencies.splice(i, 1);
            break;
        }
    }
    updateSelectionsUi();
    updateRecommendations();
};

const selectClusterClick = (clusterId = -1) => {
    if (clusterId < 0) {
        clusterId = document.getElementById("clusterIdInput").value;
        document.getElementById("currentClusterDisplay").innerText = `displaying cluster ID: ${clusterId}`;
        return setCurrentCluster(clusterId)
            .then(updateCurrentClusterUi);
    } else {
        document.getElementById("currentClusterDisplay").innerText = `displaying cluster ID: ${clusterId}`;
        return setCurrentCluster(clusterId)
            .then(updateCurrentClusterUi);
    }
};

const updateCurrentClusterUi = () => {
    const itemsList = document.getElementById('clusterItems');
    const itemsText = state.currentCluster.itemList.items.map(createListItem).join('<br>')
    itemsList.innerHTML = itemsText;
};

const createListItem = item => `${item['name']}`;


const paintCluster = (cluster, context, selectedClusters) => {
    const canvas = document.getElementById('canvas');
    const centre = [
        scaleCoordinate(cluster.centre[0], 800),
        scaleCoordinate(cluster.centre[1], 500)
    ]
    context.moveTo(centre[0], centre[1]);
    context.fillText(cluster.clusterId.toString(), centre[0], centre[1]);
    if (selectedClusters.indexOf(cluster.clusterId.toString()) > -1) {
        context.strokeStyle = '#FF0000';
        context.beginPath();
        context.arc(centre[0] + 5, centre[1] - 3, 10, 0, 2 * Math.PI, false);
        context.stroke();
        context.strokeStyle = '#FFFFFF';
    }
};

const updateSelectionsUi = () => {
    const elem = document.getElementById('selections');
    const text = state.selectedAgencies.map(agency => {
        return `<button onclick="removeSelection('${agency["item_id"]}')">-</button>` + agency["name"];
    }).join('<br>');
    elem.innerHTML = text;
};

const updateRecommendationsUi = () => {
    const recommendedClusters = [];
    state.recommendations.forEach(cluster => recommendedClusters.push(cluster.clusterId.toString()))
    paintClusters(recommendedClusters);
    describeResults();
};

const describeResults = () => {
    try {
        const elem = document.getElementById('recommendedList');
        const descriptions = state.recommendations.map(clusterDescriptionUi).join('')
        elem.innerHTML = descriptions;
    } catch (err) { }
}

const clusterDescriptionUi = cluster => `<div><button onclick="selectClusterClick(${cluster.clusterId})">${cluster.clusterId}</button>: ${cluster.summary}</div>`;

const agencyView = (agency) => {
    return `<span id="${agency["item_id"]}">
        <button onclick='addSelection(${JSON.stringify(agency)})'>+</button>
        ${agency["item_id"]} - ${agency["name"]}
        </span><br>`;
};

const scaleCoordinate = (coordinate, scale = 800) => coordinate * scale * 0.9 + scale * 0.05;

// Event listener
const attachAgencySearchOnEnterEvent = () => {
    document.getElementById("searchText")
        .addEventListener("keyup", function (event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                search();
            }
        });
}

loadClusters();
attachSelectClusterOnEnterEvent();
attachAgencySearchOnEnterEvent();
