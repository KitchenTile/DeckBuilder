import {logToPrint} from "../UI/displayLogs";

let difficulty;

//check users difficulty setting to get the right enemy HP

if(localStorage[sessionStorage["loggedInUser"]]) {

    const currentUser = JSON.parse(localStorage[sessionStorage["loggedInUser"]])

    difficulty = currentUser.difficulty

}

//Create enemy class with some properties that will be inhereted by the differnet types of enemies
export class Enemy {
    constructor(name) {
        this.name = name;
        this.spawnHealth = /*1 + Math.floor(Math.random() * 10)*/ difficulty === "Part-time" ? 1 + Math.floor(Math.random() * 10) : 20 + Math.floor(Math.random() * 10); // starting health at 30-40 HP
        this.health = this.spawnHealth; // this will keep track of the enemies health throughout the fight
        this.isAlive = true;
        this.nextMove = null;
    }

    
    //Attack method that takes a target and manages the player armor and health
    attack(target) {
        if (target.armor > 0){
            if (target.armor >= this.damage) {
                target.armor -= this.damage;
                logToPrint(`${target.name} took ${this.damage} armor damage`)
            } else if (target.armor < this.damage) {
                let damageRest = target.armor -= this.damage;
                target.health += damageRest;
                logToPrint(`${target.name} took ${damageRest * -1} damage and their armor is broken`)
                target.armor = 0;
            }
        }else {
            target.health -= this.damage;
            logToPrint(`${target.name} took ${this.damage} damage`)
            // console.log(`${target.name} took ${this.damage} damage`)
        }
    }

    decideNextMove(allies, target) { //basically execute "turn", but save the move and the target as an objext into a variable
        const randomChoice = Math.random();
        switch (this.type) {
            case "Mage":
                if (randomChoice <= 0.3) {
                    this.nextMove = {move: "HEAL ⛨", target: this.randomAlly(allies)};
                } else if (0.3 < randomChoice && randomChoice <= 0.6) {
                    this.nextMove = {move: "BUFF ⇮", target: this.randomAlly(allies)}
                } else {
                    this.nextMove = {move: "ATTACK ⚔", target: target}
                }
                break;
            case "Fighter":
                if (randomChoice < 0.4) {
                    this.nextMove = {move: "ANGER ♨", target: this}
                } else {
                    this.nextMove = {move: "ATTACK ⚔", target: target}
                }
                break;

        }
    }

    playNextMove() { // play the move that was decided in the function above
        switch (this.nextMove.move){
            case "ANGER ♨":
                this.anger();
                console.log("anger")
                break;
            case "ATTACK ⚔":
                this.attack(this.nextMove.target);
                console.log("attack")
                break;
            case "HEAL ⛨":
                this.heal(this.nextMove.target);
                console.log("heal")
                break;
            case "BUFF ⇮":
                this.buff(this.nextMove.target);
                console.log("buff")
                break;
        }
    }

    //The turn method calls both move methods, first the play and then the decide for the next turn
    turn(allies, target) {
        console.log(`${this.name}'s turn...`);
        this.playNextMove();
        this.decideNextMove(allies, target); 
    }
}


//Two enemy subclasses with an unique method each
export class Mage extends Enemy {
    constructor(name, imgSrc, deadImg) {
        super(name);
        this.type = "Mage";
        this.damage = 5 + Math.floor(Math.random() * 3);
        this.buffAbility = 15;
        this.healAbility = 10;
        this.dodgeChance = 0.2;
        this.imgSrc = imgSrc ?? "../src/images/Assets/cards/enemies/Assets-17.png";
        this.deadImg = deadImg ?? "../src/images/Assets/cards/enemies/Assets-14.png";
    }

    // Buff damage by 20%
    buff(target) {
        console.log(target)
        target.damage = Math.ceil(target.damage + target.damage * this.buffAbility / 100); 
        logToPrint(`${target.name}'s damage increased to ${target.damage}!`);
        console.log(`${target.name}'s damage increased to ${target.damage}!`);
    }

    //Heal 15HP
    heal(target) {
        if (target.isAlive) { // targets get decided before the moves are played, so if we don't add this conditional dead enemies can potentially be healed.
            if (target.health + this.healAbility >= target.spawnHealth) {
                target.health = target.spawnHealth;
                logToPrint(`${this.name} healed ${target.name} back to full health`)
                console.log(`${this.name} healed ${target.name} back to full health`)

            }  else {
                target.health += this.healAbility;
                logToPrint(`${this.name} healed ${target.name} for ${this.healAbility} HP`)
                console.log(`${this.name} healed ${target.name} for ${this.healAbility} HP`)

            }
        } else {
            logToPrint(`${target.name} was meant to be healed but got slained right before`)
            console.log(`${target.name} was meant to be healed but got slained right before`)
        }
    }


    randomAlly(allies) { // grab the game.enemies list and pick a random one based on its length
        const random = Math.floor(Math.random() * allies.length)
        if (allies[random].isAlive){ // if the ally is alive
            return allies[random]; //return ally
        } else {
            console.log("Can't use that on a dead ally")
            return this.randomAlly(allies); // important to return else function always returns undefined
        }
    }
}

export class Bandit extends Enemy {
    constructor (name, imgSrc, deadImg) {
        super(name) 
        this.damage = 10 + Math.floor(Math.random() * 6);
        this.type = "Fighter";
        this.dodgeChance = 0.4;
        this.imgSrc = imgSrc ?? "../src/images/Assets/cards/enemies/Assets-15.png";
        this.deadImg = deadImg ??  "../src/images/Assets/cards/enemies/Assets-12.png";
    }

    //buffs current damage by 50%
    anger() {
        this.damage = Math.ceil(this.damage + this.damage * 0.2);
        logToPrint(`${this.name}'s damage increased to ${this.damage}!`);
    }
}