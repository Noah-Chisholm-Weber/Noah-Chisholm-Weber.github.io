let curIndex = 0;

let gameWon = false;

/*
King: 12
Queen: 11
Jack: 10
10: 9
9: 8
8: 7
7: 6
6: 5
5: 4
4: 3
3: 2
2: 1
Ace: 0
*/

const valueImgDecoder = {
    king: "K",
    queen: "Q",
    jack: "J",
    ten: "10",
    nine: "9",
    eight: "8",
    seven: "7",
    six: "6",
    five: "5",
    four: "4",
    three: "3",
    two: "2",
    ace: "A"
};

/*
spades: 3
hearts: 2
clubs: 1
diamonds: 0
*/

const suiteImgDecoder = {
    spades: "S",
    hearts: "H",
    clubs: "C",
    diamonds: "D"
};

const imgValueDecoder = {
    king: 12,
    queen: 11,
    jack: 10,
    ten: 9,
    nine: 8,
    eight: 7,
    seven: 6,
    six: 5,
    five: 4,
    four: 3,
    three: 2,
    two: 1,
    ace: 0
};

let spades = 0;
let clubs = 0;
let hearts = 0;
let diamonds = 0;

let deck = [];

for(let v = 0; v < 13; v++) {
    for(let s = 0; s < 4; s++){
        deck.push({value: v, suite: s});
        /*let rand = Math.random();
        if(rand< 0.3){
            deck.push({value: 0, suite: 0});
        } else if(rand < 0.6) {
            deck.push({value: 1, suite: 0});
        } else {
            deck.push({value: 2, suite: 0});
        }*/
    }
}

shuffleDeck(deck);

let buttons = new Map();
let curId = 0;

function generateButton(enabled) {
    if (deck.length == 0) {
        buttons = new Map(Array.from(buttons.entries()).filter(([key, button]) => {
            if (!button.placed) {
                deck.push({ value: button.value, suite: button.suite });
                button.container.remove();
                return false;
            }
            return true;
        }));
    } else {
        let temp = new moveableButton(deck[0].value, deck[0].suite, curId);
        if (enabled) {
            temp.enableButton();
        }
        buttons.set(curId++, temp); // Store with correct ID
        deck.shift();
    }
}


function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Random index between 0 and i
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
    }
}

class moveableButton {
    constructor(value, suite, id){
        this.id = id;
        this.placed = false;
        if(suite == 0 || suite == 2){
            this.isRed = false;
        } else {
            this.isRed = true;
        }
        this.container = document.createElement("div");
        this.shouldDoubleClick = false;
        this.container.id = "id-" + id;
        this.slot = document.createElement("div");
        this.slot.classList.add("cardLocation");
        this.slot.classList.add("cardSlot");
        this.button = document.createElement("button");
        this.button.id = "moveBtnBtn";
        this.container.draggable = false;
        this.button.draggable = false;
        this.slot.draggable = false;
        this.value = value;
        this.suite = suite;
        this.enabled = false;
        this.button.disabled = true;
        let imgSource = "cardImgResources/";
        imgSource += this.getImgValue(value);
        imgSource += this.getImgSuite(suite);
        imgSource += ".png";
        this.img = imgSource;
        let tempImg = document.createElement("img");
        tempImg.draggable = false;
        tempImg.src = 'cardImgResources/gray_back.png';
        tempImg.classList.add('cardImg');
        tempImg.id = 'cardImg';
        this.button.appendChild(tempImg);
        this.button.classList.add("movableButton");
        this.button.addEventListener("mousedown", (event) => this.buttonClicked(event));
        document.addEventListener("mouseup", (event) => this.buttonReleased(event));
        this.container.style.position = "absolute";
        this.container.style.left = "125px"; // Default position
        this.container.style.top = "5px";
        this.moveHandler = (event) => this.move(event);
        this.container.appendChild(this.button);
        this.container.appendChild(this.slot)
        this.container.style.zIndex = curIndex++;
        document.body.appendChild(this.container);
    }

    getImgSuite(suite) {
        switch(suite) {
            case 3:
                return suiteImgDecoder.spades;
            case 2:
                return suiteImgDecoder.hearts;
            case 1:
                return suiteImgDecoder.clubs;
            case 0:
                return suiteImgDecoder.diamonds;
        }
    }

    enableButton() {
        this.enabled = true;
        this.button.querySelector("#cardImg").src=this.img;
        this.button.disabled = false;
    }

    getImgValue(value) {
        switch(value) {
            case 12:
                return valueImgDecoder.king;
            case 11:
                return valueImgDecoder.queen;
            case 10:
                return valueImgDecoder.jack;
            case 9:
                return valueImgDecoder.ten;
            case 8:
                return valueImgDecoder.nine;
            case 7:
                return valueImgDecoder.eight;
            case 6:
                return valueImgDecoder.seven;
            case 5:
                return valueImgDecoder.six;
            case 4:
                return valueImgDecoder.five;
            case 3:
                return valueImgDecoder.four;
            case 2:
                return valueImgDecoder.three;
            case 1:
                return valueImgDecoder.two;
            case 0:
                return valueImgDecoder.ace;
        }
    }

    buttonClicked(event) {
        if(this.shouldDoubleClick){
            let prevChild;
            let curChild;
            switch(this.suite){
                case 0:
                    curChild = document.getElementById("diamond");
                    break;
                case 1:
                    curChild = document.getElementById("club");
                    break;
                case 2:
                    curChild = document.getElementById("heart");
                    break;
                case 3:
                    curChild = document.getElementById("spade");
                    break;
            }
            while(curChild){
                console.log(curChild);
                prevChild = curChild;
                curChild = curChild.querySelector("div");
                console.log(curChild);
                if(curChild) curChild = curChild.querySelector("div");
            }
            console.log(prevChild);
            if(prevChild && this.canAttachToTarget(prevChild)){
                this.attachToTarget(prevChild);
                if(this.origin.parent && this.origin.parent.classList.contains("cardSlot")){
                    buttons.get(parseInt(this.origin.parent.parentNode.id.slice(3))).enableButton();
                }
            }
        } else {
            this.shouldDoubleClick = true;
            setTimeout(() =>{this.shouldDoubleClick = false}, 250);
            if(this.canMove) return;
            this.canMove = true;
            this.origin = {
                x: parseInt(this.container.style.left),
                y: parseInt(this.container.style.top),
                parent: null
            }
            this.container.style.zIndex = curIndex++;
            let parent = this.container.parentNode;
            if(parent && parent.id != "body") {
                this.origin.parent = parent;
                parent.removeChild(this.container);
                document.body.appendChild(this.container);
            }
            document.addEventListener("mousemove", this.moveHandler);
            this.move(event);
        }
    }

    move(event) {
        if(event.buttons != 1){
            this.buttonReleased(event);
            return;
        }
        const x = Math.max(0, Math.min(window.innerWidth - this.container.offsetWidth, event.clientX - this.container.offsetWidth / 2));
        const y = Math.max(0, Math.min(window.innerHeight - this.container.offsetHeight, event.clientY - this.container.offsetHeight / 2));

        this.container.style.left = `${x}px`;
        this.container.style.top = `${y}px`;
    }

    canAttachToTarget(target) {
        let path = this.button.querySelector("#cardImg").src;
        path = path.split("/").pop().replace(".png", ""); // Get only the filename

        let valuePart = path.slice(0, -1); // Everything except last character
        let value = 0;

        switch(valuePart) {
            case 'K':
                value = 12;
                break;
            case 'Q':
                value = 11;
                break;
            case 'J':
                value = 10;
                break;
            case '10':
                value = 9;
                break;
            case '9':
                value = 8;
                break;
            case '8':
                value = 7;
                break;
            case '7':
                value = 6;
                break;
            case '6':
                value = 5;
                break;
            case '5':
                value = 4;
                break;
            case '4':
                value = 3;
                break;
            case '3':
                value = 2;
                break;
            case '2':
                value = 1;
                break;
            case 'A':
                value = 0;
                break;
        }

        console.log("value " + value);
        console.log("endlocation: " + target.classList.contains("endLocation"))
        if(target.classList.contains("endLocation")){
            console.log("entering if");
            if(value == 0) {
                console.log(target.id);
                switch(target.id) {
                    case "diamond":
                        return this.suite == 0;
                    case "heart":
                        return this.suite == 2;
                    case "spade":
                        return this.suite == 3;
                    case "club":
                        return this.suite == 1;
                }
            }
        }

        console.log(target.classList.contains("cardLocation"));
        if(!target.classList.contains("cardSlot")){
            if(value == 12) {
                return true;
            } else {
                return false;
            }
        }

        let targetPath = target.parentNode.querySelector("#moveBtnBtn").querySelector("#cardImg").src;
        targetPath = targetPath.split("/").pop().replace(".png", ""); // Get only the filename

        let targetValuePart = targetPath.slice(0, -1); // Everything except last character
        let targetValue = 0;
        switch(targetValuePart) {
            case 'K':
                targetValue = 12;
                break;
            case 'Q':
                targetValue = 11;
                break;
            case 'J':
                targetValue = 10;
                break;
            case '10':
                targetValue = 9;
                break;
            case '9':
                targetValue = 8;
                break;
            case '8':
                targetValue = 7;
                break;
            case '7':
                targetValue = 6;
                break;
            case '6':
                targetValue = 5;
                break;
            case '5':
                targetValue = 4;
                break;
            case '4':
                targetValue = 3;
                break;
            case '3':
                targetValue = 2;
                break;
            case '2':
                targetValue = 1;
                break;
            case 'A':
                targetValue = 0;
                break;
        }
        if(target.closest(".endLocation")) {
            if(value == targetValue + 1){
                let returnVal = false;
                switch(target.closest(".endLocation").id) {
                    case "diamond":
                        if(this.suite == 0){
                            diamonds++;
                            returnVal = true;
                        }
                        break;
                    case "heart":
                        if(this.suite == 2){
                            hearts++;
                            returnVal = true;
                        }
                        break;
                    case "spade":
                        if(this.suite == 3){
                            spades++;
                            returnVal = true;
                        }
                        break;
                    case "club":
                        if(this.suite == 1){
                            clubs++;
                            returnVal = true;
                        }
                        break;
                }
                let countClubs = 0;
                let curChild = document.getElementById("club");
                while(curChild){
                    countClubs++;
                    curChild = curChild.querySelector("div");
                    if(curChild){
                        curChild = curChild.querySelector("div");
                    }
                }

                let countHearts = 0;
                curChild = let curChild = document.getElementById("heart");
                while(curChild){
                    countHearts++;
                    prevChild = curChild
                    curChild = curChild.querySelector("div");
                    if(curChild){
                        curChild = curChild.querySelector("div");
                    }
                }

                let countSpades = 0;
                curChild = let curChild = document.getElementById("spade");
                while(curChild){
                    countSpades++;
                    prevChild = curChild
                    curChild = curChild.querySelector("div");
                    if(curChild){
                        curChild = curChild.querySelector("div");
                    }
                }

                let countDiamonds = 0;
                curChild = let curChild = document.getElementById("diamond");
                while(curChild){
                    countDiamonds++;
                    prevChild = curChild
                    curChild = curChild.querySelector("div");
                    if(curChild){
                        curChild = curChild.querySelector("div");
                    }
                }
                if(countClubs == 12 && countHearts == 12 && countSpades == 12 && countDiamonds == 12){
                    gameWon = true;
                    return true
                } else {
                    return returnVal;
                }
            } else {
                return false;
            }
        } else {
            if(value == targetValue - 1){
                if(buttons.get(parseInt(target.parentNode.id.slice(3))).isRed == !this.isRed){
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    attachToTarget(target){
        this.placed = true;
        let rect = target.getBoundingClientRect();
        target.appendChild(this.container);
        this.container.style.left = 0 + "px";
        let offSet = 0;
        if(target.classList.contains("cardSlot") && target.closest(".endLocation") == null){
            console.log("standard");
            offSet = this.container.offsetHeight / 8;
        } else if (!target.classList.contains("endLocation") && target.closest(".endLocation") != null){
            console.log("-25")
            offSet = -25;
        }
        this.container.style.top = offSet+"px";
    }

    buttonReleased(event) {
        if(!this.canMove) return;
        //if(!document.elementFromPoint(event.clientX, event.clientY).closest(`#id-${this.id.toString()}`)) return;
        this.canMove = false;
        document.removeEventListener("mousemove", this.moveHandler);
        let temp = document.querySelectorAll(".cardSlot");
        for(let i = 0; i < temp.length; i++) {
            temp[i].style.pointerEvents = "auto";
        }
        let elements = document.elementsFromPoint(event.clientX, event.clientY);
        elements = elements.filter(el => el.classList.contains("cardLocation"));
        let target;
        let count = 0;
        do{
            target = elements[count];
            count++;
        } while (target == this.slot || this.container.contains(target));
        if(target && this.canAttachToTarget(target)) {
            this.attachToTarget(target);
            if(this.origin.parent && this.origin.parent.classList.contains("cardSlot")){
                buttons.get(parseInt(this.origin.parent.parentNode.id.slice(3))).enableButton();
            }
        } else {
            this.container.style.left = this.origin.x + "px";
            this.container.style.top = this.origin.y + "px";
            if(this.origin.parent) {
                this.origin.parent.appendChild(this.container);
            }
        }
        for(let i = 0; i < temp.length; i++) {
            temp[i].style.pointerEvents = "none";
        }
        if(gameWon){
            alert("Game Won!");
            location.reload();
        }
    }
}
for(let i = 1; i < 8; i++){
    for(let c = 0; c < i; c++){
        console.log("i: " + i + "c: " + c);
        if(c == i - 1){
            generateButton(true);
        } else {
            generateButton(false);
        }
            console.log("curId: " + curId);
        if(c == 0){
            console.log(document.getElementById(i.toString()));
            console.log(buttons.get(curId-1));
            (buttons.get(curId-1)).attachToTarget(document.getElementById(i + 'L'));
        } else{
            (buttons.get(curId-1)).attachToTarget((buttons.get(curId-2)).slot);
        }
    }
}