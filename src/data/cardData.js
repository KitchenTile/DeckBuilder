// import BaldElon from "../../public/images/BaldElon.png"
import BaldElon from "../images/BaldElon.png"
import ComptentBlue from "../images/ComptentBlue.png"
import HappyBlue from "../images/HappyBlue.png"


//Array of cards to add to the deck

const initialDeckData = [
    {title: "Slash", type: "attack", effect: 10, legend: "A deadly slash.", symbol: "⚔", energyCost: 2, img: BaldElon},
    {title: "Slash", type: "attack", effect: 10, legend: "A deadly slash.", symbol: "⚔", energyCost: 2, img: BaldElon},
    {title: "Slash", type: "attack", effect: 10, legend: "A deadly slash.", symbol: "⚔", energyCost: 2, img: BaldElon},
    {title: "Lethal Blow", type: "attack", effect: 18, legend: "Huge boink.", symbol: "⚔", energyCost: 3, img: BaldElon},

    {title: "Chain Mail", type: "defense", effect: 5, legend: "Prevents slashes.", symbol: "⛨", energyCost: 1, img: ComptentBlue},
    {title: "Chain Mail", type: "defense", effect: 5, legend: "Prevents slashes.", symbol: "⛨", energyCost: 1, img: ComptentBlue},
    {title: "Chain Mail", type: "defense", effect: 5, legend: "Prevents slashes.", symbol: "⛨", energyCost: 1, img: ComptentBlue},

    {title: "Chicken Leg", type: "charger", effect: 3, legend: "A healthy dose of protein.", symbol: "⛾", energyCost: 1, img: HappyBlue},
    {title: "Chicken Leg", type: "charger", effect: 3, legend: "A healthy dose of protein.", symbol: "⛾", energyCost: 1, img: HappyBlue},

    {title: "Fried Crickets", type: "charger", effect: 1, legend: "A fair dose of protein.", symbol: "⛾", energyCost: 0, img: HappyBlue},
    {title: "Fried Crickets", type: "charger", effect: 1, legend: "A fair dose of protein.", symbol: "⛾", energyCost: 0, img: HappyBlue},

    {title: "Draw 2", type: "draw", effect: 2, legend: "Draw 2 cards.", symbol: "🂡", energyCost: 1, img: HappyBlue},
    {title: "Draw 2", type: "draw", effect: 2, legend: "Draw 2 cards.", symbol: "🂡", energyCost: 1, img: HappyBlue},
    {title: "Fill Up", type: "draw", effect: 7, legend: "Draw cards until your hand is full.", symbol: "🂡", energyCost: 2, img: HappyBlue},

];

//Array of cards to add to deck after winning a battle

const rewardCardData = [
    {title: "Knock Knock", type: "attack", effect: 20, legend: "Deal 10 damage twice.", symbol: "⚔", energyCost: 2, img: BaldElon},
    {title: "Golden Plate", type: "defense", effect: 10, legend: "Very sturdy.", symbol: "⛨", energyCost: 1, img: ComptentBlue},
    {title: "Protein bar", type: "charger", effect: 3, legend: "A fair dose of protein.", symbol: "⛾", energyCost: 1, img: HappyBlue},
    // {title: "Extra Card 4", type: "draw", effect: 2, legend: "Draw 2 cards.", symbol: "🂡", energyCost: 1, img: HappyBlue},
]

export {initialDeckData, rewardCardData};
