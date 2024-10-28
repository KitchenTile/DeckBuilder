import instructionsData from "./data/instructionsData";
import navBar from "./UI/navBar";

navBar();

instructionsData.forEach(instruction => {
    document.querySelector(".instructions").innerHTML += `
        <img src= ${instruction.image} alt="img" class="instructionsImg"/>
        <h2>${instruction.text}</h2>
    `
})
