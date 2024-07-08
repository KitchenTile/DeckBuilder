// import cardData from "./data/cardData";
import "./card.css";


const displayCard = (hand) => {

    const cardDiv = document.getElementById("card_body");
    cardDiv.innerHTML = ""; // Clear the container


    hand.forEach((card, index) => {
        cardDiv.innerHTML += `
        <div class="card_container ${card.type}">
            <div class="name_symbol">
                <h1>${card.title} </h1>
                <h1>${card.symbol}</h1>
            </div>
            <img src= ${card.img} alt="img" class="img"/>
            <div class="effect_energy">
                <h3 class="effect">value: ${card.effect}</h3>
                <h3>Cost: ${card.energyCost}</h3>
            </div>
            <div class="legend_box">
                <h3 class="text">${card.legend}</h3>
            </div>
        </div>
        `
    });
    
}

export default displayCard;