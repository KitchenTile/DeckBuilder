import "./card.css";


const displayCard = (hand) => {

    const handDiv = document.getElementById("hand_container");
    handDiv.innerHTML = ""; // Clear the container to make make a new one for next card


    /* create a div for each card with a class containing the card type for css and an id to identify it by each index*/
    hand.forEach((card, index) => {
        handDiv.innerHTML += `
        <div class="card_container ${card.type}" id="card_${index}"> 
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

const displayRewardCard = (rewardList) => {
    const cardRewardVisual = document.getElementById("card_Reward_Visual");
    cardRewardVisual.innerHTML = ""; // Clear the container to make make a new one for next card


    /* it's the same as the function above, I feel like it should just be one to avoid code dupping. I also had to change the id name of each card in te container*/
    rewardList.forEach((card, index) => {
        cardRewardVisual.innerHTML += `
        <div class="card_container ${card.type}" id="reward_card_${index}">
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

export {displayCard, displayRewardCard};