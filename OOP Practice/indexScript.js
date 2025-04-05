//EX: Character-Based RPG
// Review of JS Objects

character1 = {
    name: "NameOne",
    hp: 20,
    strength: 100
};

character2 = {
    name: "NameTwo",
    hp: 21,
    strength: 101
};

console.log(character1);
console.log(character2);

// Issues: Mismatched attibs, no behaviors or methods

// Legacy JS: Object Constructor Functions
//mitigates the mismatched attribs problem of before
//alows for behaviors of methods

function characterOld(nameIn, hpIn, strengthIn) {
    this.name = nameIn;
    this.hp = hpIn;
    this.strength = strengthIn;
    this.greet =  function () {
        console.log("Hello! My name is " + this.name + ".");
    }
}

character3 = new characterOld("NameThree", 904, 382);

console.log(character3);

character3.greet();

//new issues: no control or protection over the data.

character3.hp -= 1000;

console.log("Jacod was attacked! New hp: " + character3.hp);

// Real Classes: are the preffered modern way to work with objects, new to JS

// Classes are blueprints for objects in our programs, groups properties(attributes) and behaviors(methods)
// Allow proper ecapsulation and abstraction

//static vars and methods = shared amongst all instances

class character {
    // Attribs
    #hp;
    #class;
    static count = 0;
    //constructor
    constructor(nameIn, hpIn = 10, strengthIn = 10){
        this.name = nameIn;
        this.#hp = hpIn;
        this.strength = strengthIn;
        this.defense = 10;
        this.itemInv = [];
        this.gold = 0;
        character.count++;
    }

    // Methods
    greet() {
        console.log("Hello! My name is " + this.name + ".");
    }

    addToInv(item) {
        this.itemInv.push(item)
    }

    modifyHealth(value) {
        this.#hp = Math.max(0, this.#hp - value);
    }

    set hp(value) {
        value < 0 ? this.#hp = 0 : this.#hp = value;
    }

    toString() {
        return this.name;
    }

    get hp() {
        return this.#hp;
    }

    get class() {
        return this.#class;
    }

    set class(classIn) {
        const validClasses = ["warrior", "wizard", "warlock"];
        if(validClasses.includes(classIn.toLowerCase())) this.#class = classIn.toLowerCase();
        else throw new Error('Invalid class! Must be "warrior", "wizard", or "warlock."');
    }

    attack(target, amount) {
        console.log(this + " attacks " + target + " for " + amount + " hp.");
        target.modifyHealth(amount);
        console.log("This leaves " + target + " at " + target.hp + " hp.");
    }

    static generateName() {
        const names = ['rand1', 'rand2', 'rand3', 'rand4', 'rand5'];
        return names[Math.floor(Math.random() * names.length)];
    }
};

character4 = new character("NameFour", 8902, 9803);

console.log(character4);

character4.greet();

character5 = new character("NameFive");

console.log(character5);

character5.addToInv("Sword");

console.log(character5);

console.log(character5.hp);
character5.modifyHealth(4);
console.log(character5.hp);
character5.modifyHealth(100);
console.log(character5.hp);

character5.hp += 100;
console.log(character5.hp);
character5.hp -= 1000;
console.log(character5.hp);

character5.class = "warrior";

console.log(character5.class)

console.log("" + character5);

character5.modifyHealth(-100);
console.log(character5.hp);

character4.attack(character5, 10)

console.log(character5.hp);

console.log(character.count);

let character6 = new character(character.generateName());

console.log(character6.name);
console.log(character.count);