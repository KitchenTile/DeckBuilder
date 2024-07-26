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

        mapDiv.appendChild(tileDiv);
    })
}

export default displayMap;