class character {
    // Attribs
    #hp;

    //constructor
    constructor(nameIn){
        this.name = nameIn;
        this.#hp = 20;
    }

    toString() {
        return `${this.name} (${this.#hp})`;
    }

    attack(enemy) {
        console.log(`${this.name} prepares to attack ${enemy.name}`);
    }

    set hp(value) {
        this.#hp = value < 0 ? 0 : value;
    }

    get hp() {
        return this.#hp
    }
};

class mage extends character {
    castSpell(enemy) {
        console.log(`${this.name} prepares to enchant ${enemy.name} with ${this.mana} mana power!`);
    }

    constructor(name, mana){
        super(name);
        this.mana = mana;
    }

    attack(enemy) {
        super.attack(enemy);
        console.log(' by casting a spell!');
    }
}

character1 = new character('name1');

console.log(character1 + '!');
character1.attack(character1);

mage1 = new mage('name2', 100);

mage1.castSpell(character1);

mage1.attack(character1);