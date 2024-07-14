import logToPrint from "../UI/displayLogs";


//Create enemy class with some properties that will be inhereted by the differnet types of enemies
export class Enemy {
    constructor(name) {
        this.name = name;
        // this.position = position;
        this.spawnHealth = 30 + Math.floor(Math.random() * 10); // starting health at 30-40 HP
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
}


//Two enemy subclasses with an unique method each
export class Mage extends Enemy {
    constructor(name, imgSrc) {
        super(name);
        this.type = "Mage";
        this.damage = 5 + Math.floor(Math.random() * 3);
        this.buffAbility = 15;
        this.healAbility = 10;
        this.dodgeChance = 0.2;
        this.imgSrc = imgSrc ?? "../src/images/mage.png";
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
        if (target.health + this.healAbility >= this.spawnHealth) {
            target.health = this.spawnHealth;
            logToPrint(`${this.name} healed ${target.name} back to full health`)
            console.log(`${this.name} healed ${target.name} back to full health`)

        }  else {
            target.health += this.healAbility;
            logToPrint(`${this.name} healed ${target.name} for ${this.healAbility} HP`)
            console.log(`${this.name} healed ${target.name} for ${this.healAbility} HP`)

        }
    }


    randomAlly(allies) { // grab the game.enemies list and pick a random one based on its length
        const random = Math.floor(Math.random() * allies.length)
        if (allies[random].isAlive && typeof allies[random] !== "undefined"){ // if the ally is alive
            return allies[random]; //return ally
        } else {
            console.log("Can't use that on a dead ally")
            return this.randomAlly(allies); // important to return else function always returns undefined
        }
    }
    
    //StS has a feature where you're able to see the enemie's next move, here's how I did it
    decideNextMove(allies, target) { 
        const randomChoice = Math.random(); //basically execute "turn", but save the move and the target as an objext into a variable
        if (randomChoice <= 0.3) {
            this.nextMove = {move: "HEAL", target: this.randomAlly(allies)};
        } else if (0.3 < randomChoice && randomChoice <= 0.6) {
            this.nextMove = {move: "BUFF", target: this.randomAlly(allies)}
        } else {
            this.nextMove = {move: "ATTACK", target: target}
        }
    }

    playNextMove() { // play the move that was decided in the function above
        switch (this.nextMove.move){
            case "HEAL":
                this.heal(this.nextMove.target);
                break;
            case "BUFF":
                this.buff(this.nextMove.target);
                break;
            case "ATTACK":
                this.attack(this.nextMove.target);
                break;
        }
    }

    turn(allies, target) { // I added allies so i can use the mage methods in itself or others
        console.log(`${this.name}'s turn...`);
        // const randomChoice = Math.random();
        // if (randomChoice <= 0.3) {
        //     this.heal(this.randomAlly(allies));
        //     this.nextMove = "HEAL";
        // } else if (0.3 < randomChoice && randomChoice <= 0.6) {
        //     this.buff(this.randomAlly(allies));
        //     this.nextMove = "BUFF";
        // } else {
        //     this.attack(target);
        //     this.nextMove = "ATTACK";
        // }
        this.decideNextMove(allies, target); //new turn method only decides the next move
    }
}

export class Bandit extends Enemy {
    constructor (name) {
        super(name) 
        this.damage = 10 + Math.floor(Math.random() * 6);
        this.type = "Fighter";
        this.dodgeChance = 0.4;
        this.imgSrc = "../src/images/slime.png";
    }

    //buffs current damage by 50%
    anger() {
        this.damage = Math.ceil(this.damage + this.damage * 0.2);
        logToPrint(`${this.name}'s damage increased to ${this.damage}!`);
        // console.log(`${this.name}'s damage increased to ${this.damage}!`);

    }


    //does same as mage methods
    decideNextMove(allies = null, target) {
        const randomChoice = Math.random();
        if (randomChoice < 0.4) {
            this.nextMove = {move: "ANGER", target: this}
        } else {
            this.nextMove = {move: "ATTACK", target: target}
        }
    }

    playNextMove() {
        switch (this.nextMove.move){
            case "ANGER":
                this.anger();
                break;
            case "ATTACK":
                this.attack(this.nextMove.target);
                break;
        }
    }

    turn(allies = null, target) { // I set allies to null because bandit's only attack 
        logToPrint(`${this.name}'s turn...`);
        console.log(`${this.name}'s turn...`);
    //     const randomChoice = Math.random();
    //     if (randomChoice < 0.4) {
    //         this.anger();
    //         this.nextMove = "ANGER";
    //     } else {
    //         this.attack(target);
    //         this.nextMove = "ATTACK";
    //     }
        this.decideNextMove(allies = null, target);

    }
}