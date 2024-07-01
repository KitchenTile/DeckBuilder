//Create enemy class with some properties that will be inhereted by the differnet types of enemies

export class Enemy {
    constructor(name, dodgeChance) {
        this.name = name;
        // this.position = position;
        this.dodgeChance = dodgeChance;
        this.health = 50;
    }

    //Attack method that takes a target and manages the player armor and health
    attack(target) {
        if (target.armor > 0){
            if (target.armor >= this.damage) {
                target.armor -= this.damage;
            } else if (target.armor < this.damage) {
                let damageRest = target.armor -= this.damage;
                target.health += damageRest;
                target.armor = 0;
            }
        }else {
            target.health -= this.damage;
        }
    }

}


//Two enemy subclasses with an unique method each
export class Mage extends Enemy {
    constructor(name, dodgeChance) {
        super(name, dodgeChance);
        this.damage = 5;
        this.buffAbility = 20;
    }

    buff(target) {
        target.damage += target.damage * this.buffAbility / 100;
        console.log(`${target.name}'s damage increased to ${target.damage}!`);
    }
}

export class Bandit extends Enemy {
    constructor (name, dodgeChance) {
        super(name, dodgeChance) 
        this.damage = 10;
    }

    anger() {
        this.damage += this.damage * 0.5;
        console.log(`${this.name}'s damage increased to ${this.damage}!`);
    }
}