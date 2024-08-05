import itemData from "../data/itemData";

const itemList = []; //global item list

export class item{
    constructor(name, effect, description, symbol) {
        this.name = name;
        this.effect = effect;
        this.description = description;
        this.symbol = symbol;
    }


}

const createItem = (itemInfo) => { // function that creates items from data
    return new item(itemInfo.name, itemInfo.effect, itemInfo.description, itemInfo.symbol);
}

export const populateItemList = () => { //Fill item list with items
    itemData.forEach(item => {
        itemList.push(createItem(item));
        console.log(item.name)
    });

    return itemList
}

export const rewardItem = (target) => { //gives player a random item from the list and activates it's effect

    const randomItemIndex = Math.floor(Math.random() * itemList.length);
    const randomItem = itemList[randomItemIndex];

    target.items.push(randomItem);
    console.log(itemList);
    
    if (randomItem) {
        switch (randomItem.name) {
            case "First Aid Kit":
                target.maxHealth += randomItem.effect;
                target.health += randomItem.effect;
                console.log("First Aid aquired")
                break;
            case "Light Bulb":
                target.startingEnergy += randomItem.effect;
                console.log("Light bulb aquired")
                break;
            case "Extra Plates":
                target.startingArmor += randomItem.effect;
                console.log("Extra plates aquired")
                break;
        }
    }
    
    itemList.splice(randomItemIndex, 1); //Remove item from list so it doesn't give it more than once

    itemList.forEach(item => {
        console.log(item.name)
    })
    
}