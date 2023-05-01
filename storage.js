/*function saveState(state) {
    localStorage.setItem("appState", JSON.stringify(state));
}

function loadState() {
    const stateJSON = localStorage.getItem("appState");
    if (stateJSON) {
        return JSON.parse(stateJSON);
    }
    return null;
}
