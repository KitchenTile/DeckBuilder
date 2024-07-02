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
                console.log(`${target.name} took ${this.damage} armor damage`)
            } else if (target.armor < this.damage) {
                let damageRest = target.armor -= this.damage;
                target.health += damageRest;
                target.armor = 0;
                console.log(`${target.name} took ${damageRest * -1} damage`)
            }
        }else {
            target.health -= this.damage;
            console.log(`${target.name} took ${this.damage} damage`)
        }
    }

}


//Two enemy subclasses with an unique method each
export class Mage extends Enemy {
    constructor(name, dodgeChance) {
        super(name, dodgeChance);
        this.type = "Mage";
        this.damage = 5;
        this.buffAbility = 20;
        this.healAbility = 15;
    }

    // Buff damage by 20%
    buff(target) {
        target.damage += target.damage * this.buffAbility / 100; 
        console.log(`${target.name}'s damage increased to ${target.damage}!`);
    }

    //Heal 15HP
    heal(target) {
        if (target.health + this.healAbility >= 50) {
            target.health = 50;
            console.log(`${this.name} healed ${target.name} back to full health`)
        }  else {
            target.health += this.healAbility;
            console.log(`${this.name} healed ${target.name} for ${this.healAbility} HP`)
        }
    }
}

export class Bandit extends Enemy {
    constructor (name, dodgeChance) {
        super(name, dodgeChance) 
        this.damage = 10;
        this.type = "Fighter";
    }

    //buffs current damage by 50%
    anger() {
        this.damage += this.damage * 0.5;
        console.log(`${this.name}'s damage increased to ${this.damage}!`);
    }
}