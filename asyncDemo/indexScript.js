let data = null;

function loadData() {
    arr = [];
    for (let i = 0; i < 5000; i++)
        arr.push(Math.floor(Math.random() * 10000));

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

        // Added to slow down processing
        console.log(arr);
    }

    const mid = Math.floor(arr.length / 2);
    const median = arr.length % 2 === 0
        ? (arr[mid - 1] + arr[mid]) / 2
        : arr[mid];

    // Added to showcase completion
    alert('Processing complete.');

    let dataSuccessful = parseInt(Math.random() * 2);
    if (dataSuccessful) {
        data = median;
        return true;
    }
    else
        return false;
}

function updateDisplay(value) {
    document.getElementById('median').innerHTML = value;
}

// window.onload = function() {
//     loadData();
//     updateDisplay(data);
// }

// promise: object that links your "producing code, ex loadData()" to your consuming code your "consuming code, ex updateDisplay"
// has built in handeling of failure of producing code
window.onload = function () {
    // let myPromise = new Promise(function(resolve, reject) {
    //     let dataSuccessful = loadData();
    //     if(dataSuccessful) resolve(data); else reject("Unable to load data.");
    // });

    // myPromise.then(
    //     function(value) { updateDisplay(value); },
    //     function(error) { updateDisplay(error); }
    // ).finally(function() {
    //     //example removing load symbols
    //     console.log("processing complete, cleaning up...");
    // });
    

    //async: forces a function to return a promise
    // async function myAsync() {
    //     if(loadData()){
    //         return data;
    //     } else {
    //         throw new Error("Unable to load data!");
    //     }
    // }
    
    // myAsync().then(
    //     function(value) { updateDisplay(value); },
    // ).catch(function(error) {updateDisplay(error); });



    //await: can only be used inside of an async function waits for a resolution of a promise
    // placed before a promise or function that returns one

    // async function myAsync() {
    //     try {
    //         let myPromise = new Promise(function(resolve, reject) {
    //             let dataSuccessful = loadData();
    //             if(dataSuccessful) resolve(data); else reject("Unable to load data.");
    //         });
    //         let result = await myPromise;
    //         updateDisplay(result);
    //     } catch (error) {
    //         updateDisplay(error);
    //     }
    // }

    // myAsync();



    //JSON: Java Script Object Notation
    //not json standard JS obect:
    // const user = {
    //     name: "Name",
    //     age: 21,
    //     password: "password"
    // };

    // let userJSON = JSON.stringify(user);

    // console.log(userJSON);

    // let downloadedUser = JSON.parse(userJSON);
    // console.log(downloadedUser);

    // let downloadedData = '[{"name": "name1", "age":21, "password":"password1"}, {"name": "name2", "age":22, "password":"password2"}, {"name": "name3", "age":23, "password":"password3"}]';
    
    // let users = JSON.parse(downloadedData);
    // console.log(users);
    // console.log(users[0].name);

    //weather example
    async function getWeather() {
        try {
            let response  = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.223&longitude=-111.9738&hourly=temperature_2m&temperature_unit=fahrenheit");
            let data = await response.json();
            let midTemp = data.hourly.temperature_2m[0];
            let midTime = data.hourly.time[0];

            document.getElementById('median').innerHTML = "midTime: " + midTime + " had temp of: " + midTemp;
        } catch (error) {
            updateDisplay("Error fetching the weather.");
        }
    }

    getWeather();

}