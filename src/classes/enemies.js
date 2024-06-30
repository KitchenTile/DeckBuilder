export class Enemy {
    constructor(name, dodgeChance) {
        this.name = name;
        // this.position = position;
        // this.damage = damage;
        this.dodgeChance = dodgeChance;
        this.health = 50;
    }

    attack(target) {
        if (target.armor > 0){
            if (target.armor >= this.damage) {
                target.armor -= 5;
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

export class Mage extends Enemy {
    constructor(name, dodgeChance) {
        super(name, dodgeChance);
        this.damage = 5;
        this.buffAbility = 20;
    }

    buff(target) {
        target.damage += target.damage * this.buffAbility / 100;
        console.log(target.damage);
    }
}

export class Bandit extends Enemy {
    constructor (name, dodgeChance) {
        super(name, dodgeChance) 
        this.damage = 10;
    }

    anger() {
        this.damage += this.damage * 0.5;
        console.log(this.damage);
    }
}