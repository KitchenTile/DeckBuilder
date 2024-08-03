import itemData from "../data/itemData";

const itemList = [];

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

export const populateItemList = () => {

    itemData.forEach(item => {
        itemList.push(createItem(item));
        console.log(item.name)
    });

    return itemList
}

export const rewardItem = (player) => {

    const randomItem = itemList[Math.floor(Math.random() * (itemList.length))];

    player.items.push(randomItem)
    console.log(itemList);
    
    if (randomItem) {
        switch (randomItem.name) {
            case "ITEM 1":
                player.maxHealth += randomItem.effect;
                player.health += randomItem.effect;
                break
            case "ITEM 2":
                player.startingEnergy += randomItem.effect;
                break;
        }
    }
    
    itemList.splice(randomItem, 1);

    console.log(itemList);
}