class character {
    // Attribs
    #hp;

    //protected data example - private data is only accessible within the class itself if the mage for instance wanted to access it it would not be able to unless through the public interface.
    // JS does not have real protected data but it can be simulated as a sort of "pusdo-protected" data




    //constructor
    constructor(nameIn){
        this.name = nameIn;
        this.#hp = 20;
        this.items = [];
        this._strength = 25; // "protected" data
    }

    //type checking example - items need to be of type item
    addItem(itemIn) {
        if(itemIn instanceof item)
        this.items.push(itemIn);
        else {
            throw new Error(item + ' is not a valid item! It must be of type item!');
        }
    }

    toString() {
        return `${this.name} (${this.#hp})`;
    }

    // another example of type checking
    attack(enemy) {
        if (!(enemy instanceof character)) // check if the enemy is an instance of the character class
            throw new Error(enemy + ' is not a valid enemy! It must be of type character!');
        else
            console.log(`${this.name} prepares to attack ${enemy.name}`);
    }

    set hp(value) {
        this.#hp = value < 0 ? 0 : value;
    }

    get hp() {
        return this.#hp
    }

    get strength() {
        return this._strength;
    }

    set strength(value) {
        this._strength = value > 100 ? 100 : value;
    }
};

class material {
    constructor(name) {
        this.name = name;
    }
}

class battle {
    //creates an association between the character and the enemy classes
    constructor(pc, enemy) {
        this.pc = pc;
        this.enemy = enemy;
    }
}

    // enumeration - limited set of values for comparison
    // js does not have real enums but it can be simulated with a frozen object

    const ItemType = Object.freeze({
        ATTACK: 0,
        DEFENSE: 1,
        MAGIC: 2
    });

class item {
    constructor(name, itemType, materialName = 'wood'){
        //bad enum example
        /*if (itemType !== 'attack' && itemType !== 'defense') {
            throw new Error('Invalid item type!');
        }*/
        //good enum example uses the frozen object above
        if (!Object.values(ItemType).includes(itemType)) {
            throw new Error(itemType + ' is not a valid item type! Expecting: ATTACK, DEFENSE, MAGIC'/* + Object.values(ItemType).join(', ')*/);
        }
    
        this.name = name;
        this.itemType = itemType;
        this.material = new material(materialName);
    }
}

class healerBot {
    // dependency example - the healer class depends on the character class to be able to heal a character
    heal(character) {
        console.log(`${this.name} heals ${character.name}`);
    }
}

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

    get strength() {
        return super.strength;
    }

    set strength(value) {
        super.strength = value > 50 ? 50 : value;
    }
}

character1 = new character('name1');

console.log(character1 + '!');
character1.attack(character1);

mage1 = new mage('name2', 100);

mage1.castSpell(character1);

mage1.attack(character1);

// no longer valid with the new enum example
//sword = new item('Sword', "attack", 'gold');
// now valid with the new enum example
//valid item example
sword = new item('Sword', ItemType.ATTACK, 'gold');

//invalid item example
//shield = "shield";
//character1.addItem(shield); // this will throw an error as the item is not of type item

character1.addItem(sword);
console.log(character1.items[0]);
character1.strength = 500;
console.log(character1.strength); 
// locked to 100 with the setter method but not being private character1._strength = 500 will work and won't error; // this is not a good idea but it is possible to do this in JS
character1._strength = 500;
console.log(character1._strength);

// example of attack type checking
//character1.attack("enemy"); // this will throw an error as the enemy is not of type character
//character1.attack(sword);

mage1.strength = 500;
console.log(mage1.strength);
// locked to 50 with the setter method but not being private mage1._strength = 500 will work and won't error; // this is not a good idea but it is possible to do this in JS
mage1._strength = 500;
console.log(mage1._strength);

// "Theoretical" class relationships
// Inheritance - shown above
// Composition - when a class is made up of other classes; "tight-binding" A class can't exist without the other class
    // e.g. car and engine if the car is destroyed the engine is too
// Aggregation - one class has or owns another class part of it; "loose-binding" A class can exist without the other class
    // e.g. a character might have a weapon but the weapon can exist without the character if the character is destroyed the weapon does not have to be
// Dependency - temporary relationship
    // e.g. the characters attack function depends on the character class itself as a parameter.
// Association - classes exist separately, but instances "know" about each other
    // e.g. a university might have a student class and a course class, these are completely separate not every student sees every course and not every course has every student in it. But when a student registers for a course the course will "know" about the student and the student will "know" about the course.

// Others if time allows
// enumerations - see itemType example above
// type-checking