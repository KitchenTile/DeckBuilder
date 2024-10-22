import SprayBottle from "../images/Assets/cards/Spray.png";
import Broom from "../images/Assets/cards/Broom.png";
import Gloves from "../images/Assets/cards/Gloves.png";
import Mask from "../images/Assets/cards/Mask.png";
import Apron from "../images/Assets/cards/Apron.png";
import Banana from "../images/Assets/cards/Banana.png";
import Coffee from "../images/Assets/cards/Coffee.png";
import ApronSmall from "../images/Assets/cards/ApronSmall.png";
import Bucket from "../images/Assets/cards/Bucket.png";
import Supplies from "../images/Assets/cards/Supplies.png";



import Vacuum from "../images/Assets/cards/Vacuum.png";
import HazmatSuit from "../images/Assets/cards/Suit.png";
import Sandwich from "../images/Assets/cards/Sandwich.png";

//Array of cards to add to the deck

const initialDeckData = [
    {title: "Spray'em", type: "attack", effect: 10, legend: "What's in the bottle?", symbol: "⚔", energyCost: 2, img: SprayBottle},
    {title: "Spray'em", type: "attack", effect: 10, legend: "What's in the bottle?", symbol: "⚔", energyCost: 2, img: SprayBottle},
    {title: "Spray'em", type: "attack", effect: 10, legend: "What's in the bottle?", symbol: "⚔", energyCost: 2, img: SprayBottle},
    {title: "Sweep'em", type: "attack", effect: 18, legend: "Not just for dust.", symbol: "⚔", energyCost: 3, img: Broom},

    {title: "Face Mask", type: "defense", effect: 5, legend: "PPE's finest", symbol: "⛨", energyCost: 1, img: Mask},
    {title: "Gloves", type: "defense", effect: 7, legend: "Leave no trace", symbol: "⛨", energyCost: 1, img: Gloves},
    {title: "Apron", type: "defense", effect: 10, legend: "Not just for cooking", symbol: "⛨", energyCost: 2, img: Apron},

    {title: "Banana", type: "charger", effect: 3, legend: "Healthy snack!", symbol: "⛾", energyCost: 1, img: Banana},
    {title: "Banana", type: "charger", effect: 3, legend: "Healthy snack!", symbol: "⛾", energyCost: 1, img: Banana},

    {title: "coffee", type: "charger", effect: 1, legend: "Cup of Joe", symbol: "⛾", energyCost: 0, img: Coffee},
    {title: "coffee", type: "charger", effect: 1, legend: "Cup of Joe", symbol: "⛾", energyCost: 0, img: Coffee},

    {title: "Some Supplies", type: "draw", effect: 2, legend: "Good to be ready", symbol: "🂡", energyCost: 1, img: ApronSmall},
    {title: "More Supplies", type: "draw", effect: 2, legend: "Prepare for the worst", symbol: "🂡", energyCost: 1, img: Bucket},
    {title: "Care Package", type: "draw", effect: 7, legend: "For the toughest of stains", symbol: "🂡", energyCost: 2, img: Supplies},
    //Care package is meant to fill up your hand, but since the length of your hand varies depending on items and state,
    // the effect of the card is the max amount of cards you can have in your hand with the "Ace Under The Sleeve" item
    // and the effect the player actually gets is managed in the play function.
];

//Array of cards to add to deck after winning a battle

const rewardCardData = [
    {title: "Vacuum'em", type: "attack", effect: 20, legend: "If this doesn't work...", symbol: "⚔", energyCost: 2, img: Vacuum},
    {title: "Hazmat suit", type: "defense", effect: 10, legend: "Used in chernobyl", symbol: "⛨", energyCost: 1, img: HazmatSuit},
    {title: "Meal Deal", type: "charger", effect: 5, legend: "Tescos Finest", symbol: "⛾", energyCost: 1, img: Sandwich},
    // {title: "Extra Card 4", type: "draw", effect: 2, legend: "Draw 2 cards.", symbol: "🂡", energyCost: 1, img: HappyBlue},
]

const cardTypeList = [
    {type: "attack", upgraded: false},    
    {type: "defense", upgraded: false},  
    {type: "charger", upgraded: false},  
    {type: "draw", upgraded: false},  
]

export {initialDeckData, rewardCardData, cardTypeList};
