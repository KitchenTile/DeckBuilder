import "../../style.css"

// modify div to show card upgrade options

const upgradeCardDisplay = (cardTypeList) => {
    const upgradeDiv = document.getElementById("upgradeCardVisual");
    upgradeDiv.innerHTML = `<div class="upgradeText"> Upgrade a type of card! </div>`;

    cardTypeList.forEach((card, index) => {
            upgradeDiv.innerHTML += `
            <button class="type_button" id="type_button_${index}">${card.type}</button>
            `
    });
}

export default upgradeCardDisplay;