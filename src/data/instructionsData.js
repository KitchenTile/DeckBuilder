import cards from "../images/Instructions_cards.png";
import endScreen from "../images/Instructions_endscreen.png";
import enemy from "../images/Instructions_enemy.png";
import map from "../images/Instructions_map.png";
import player from "../images/Instructions_player.png";


const instructionsData = [
    { image: player, text: "This is you! And these here are your stats, when your health reaches 0, your shifts abrouptly finishes, your armor shields you against germs and your energy allows you to play more cards!."},
    { image: cards, text: "This here are your cards, each card has a type (attack, defense, draw, charge). Attacks are how you beat enemies, defends (PPE) raise your armor against germs, draw get you extra cards in your hand and charge give you enery to play cards and replenish your health. Cards have an energy cost and an effect (on you or an enemy)."},
    { image: map, text: "This is the blue print for the house you are cleaning, make sure to select the first battle before starting, going from the bedrooms, livingroom, bathroom all the way to the kitchen."},
    { image:  enemy, text: "These are the enemies you are up against Mages can heal, attack and amplify other enemies strength. You can see the enemies move titled 'next move'." },
    { image: endScreen, text: "If you see this screen, great job! you cleared a room. Here you have the chance to pick up an extra card, get an item, and permanently upgrade a type of card! Upgraded cards show up with a '+' sign next to their name."}
];

export default instructionsData;