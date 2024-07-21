import mapData from "../data/mapData";
import "./map.css"

const displayMap = (currentTile) => {
    const mapDiv = document.getElementById("map_container")
    mapDiv.innerHTML = "";
    
    mapData.forEach((tile, index) => {
        const tileDiv = document.createElement("div");
        tileDiv.className = "tile";
        tileDiv.id = `tile_${index}`;
        tileDiv.innerHTML = `<h2>${tile.type}</h2>`

        if (index === currentTile) {
            tileDiv.classList.add("current-tile")
        } else if (tile.completed) {
            tileDiv.classList.add("completed-tile")
        }

        mapDiv.appendChild(tileDiv);
    })
}

export default displayMap;