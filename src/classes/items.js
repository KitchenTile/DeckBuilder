export class item{
    constructor(name, effect, description, symbol) {
        this.name = name;
        this.effect = effect;
        this.description = description;
        this.symbol = symbol;
    }


    

}

export const createItem = (itemInfo) => { // function that creates items from data
    return new item(itemInfo.name, itemInfo.effect, itemInfo.description, itemInfo.symbol);
}

export const rewardItem = (itemData) => {
    const itemList = [];
    itemData.forEach(item => {
        itemList.push(createItem(item));
    });

    console.log(itemList);
}