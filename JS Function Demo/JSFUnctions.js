function selectionSort(arr, callback) {
	let n = arr.length;
	
	for (let i = 0; i < n - 1; i++) {
		let minIndex = i;
		for (let j = i + 1; j < n; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}

		temp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
	}

	// Sorting complete, execute callback
	return callback(arr);
}

function generateRandomData(size) {
	arr = [];
	for (let i = 0; i < size; i++)
		arr.push(Math.floor(Math.random() * 1000));
	return arr;
}

// Function relies on sorted data
function findMedian(sortedArray) {
	const mid = Math.floor(sortedArray.length / 2);
	const median = sortedArray.length % 2 === 0
		? (sortedArray[mid - 1] + sortedArray[mid]) / 2
		: sortedArray[mid];
	
	return median;
}

const stu = ['stu1', 'stu2', 'stu3'];
const addDear = name => "Dear " + name;
const greetedStu = stu.map(addDear);
console.log(greetedStu);
const numbers = [1, 2, 3, 4, 5];
const squaredNums = numbers.map(num => num * num);
console.log(squaredNums);


const usrnames = ['usr1', 'usr2', 'usr3', 'anusr1', 'anusr2', 'anusr3'];
const filtered = usrnames.filter(name => name[0] == 'u');
console.log(filtered);

const reducedNums = numbers.reduce((accumulator, curValue) => {
	accumulator += curValue;
	console.log(accumulator + ', ' + curValue);
	return accumulator;
	}, 24);
console.log(reducedNums);

const singleString = usrnames.reduce((out, curString) => out += curString + ', ', 'abcd');
console.log(singleString);

log13 = () => {console.log('hello'); return 'hello again'};

console.log(log13());

const itms = ['itm1', 'itm2', 'itm3'];
itms.forEach(itm => console.log('|' + itm + '|'));
for(itm in itms) {
	console.log('|' + itm + '|');
}
for(itm of itms) {
	console.log('|' + itm + '|');
}

const actionIn = i => console.log('hello world i = ' + i);

function repeatActions(action, times) {
	for(let i = 0; i < times; i++) {
		action(i);
	}
}

repeatActions(actionIn, 5);

const doSomething = i => console.log('something was done for the ith time where i = ' + i);
repeatActions(doSomething, 25);

const doanother = i => repeatActions(doSomething, i);

repeatActions(doanother, 5);

const applyOperation = (operation, num1, num2) => operation(num1, num2);
const addOperation = (num1, num2) => num1 + num2;
const subOperation = (num1, num2) => num1 - num2;
const multOperation = (num1, num2) => num1 * num2;
const divOperation = (num1, num2) => num1 / num2;

const operationArray =  [addOperation, subOperation, multOperation, divOperation];

for(let i = 0; i < 25; i++){
	let num1 = parseInt(Math.random() * 10) + 1;
	let num2 = parseInt(Math.random() * 10) + 1;
	operationArray.forEach(operation => console.log(applyOperation(operation, i + 2, i + 1), operation));
	operationArray.push(operationArray.shift());
}

function createGreeter(message) {
	return function(name) {
		return message + ', ' + name + '!';
	}
}

let morningGreeter = createGreeter("Good Morning");

console.log(morningGreeter('name1'));

const greetEveryone = () => usrnames.forEach(name => console.log(morningGreeter(name)));

setTimeout(greetEveryone, 10000);





function createCounter() {
	let count = 0;
	return function () {
		count++;
		return count;
	}
}

const count1 = createCounter();
const count2  = createCounter();

console.log('count1: ' + count1());
console.log('count2: ' + count2());
console.log('count2: ' + count2());