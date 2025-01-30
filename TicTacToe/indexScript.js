let xTurn = true;
let gameOver = false;

function changeMark(buttonId) {
    let currentButton = document.getElementById(buttonId);
    let currentMark = currentButton.innerHTML;

    if(gameOver) {
        resetGame();
        return;
    }

    if (!currentMark) {
        if (xTurn) {
            currentButton.innerHTML = "X";
            currentButton.className = "X";
        } else {
            currentButton.innerHTML = "O";
            currentButton.className = "O";
        }
        xTurn = !xTurn;
        checkWin();
    }
}

function resetGame() {
    document.getElementById("a1").innerHTML = "";
    document.getElementById("b1").innerHTML = "";
    document.getElementById("c1").innerHTML = "";
    document.getElementById("a2").innerHTML = "";
    document.getElementById("b2").innerHTML = "";
    document.getElementById("c2").innerHTML = "";
    document.getElementById("a3").innerHTML = "";
    document.getElementById("b3").innerHTML = "";
    document.getElementById("c3").innerHTML = "";
    document.getElementById("a1").className = "";
    document.getElementById("b1").className = "";
    document.getElementById("c1").className = "";
    document.getElementById("a2").className = "";
    document.getElementById("b2").className = "";
    document.getElementById("c2").className = "";
    document.getElementById("a3").className = "";
    document.getElementById("b3").className = "";
    document.getElementById("c3").className = "";
    gameOver = false;
    xTurn = true;
    document.getElementById("winResultOutput").innerHTML = "";
}

function checkWin() {
    let a1 = document.getElementById("a1").innerHTML;
    let b1 = document.getElementById("b1").innerHTML;
    let c1 = document.getElementById("c1").innerHTML;
    let a2 = document.getElementById("a2").innerHTML;
    let b2 = document.getElementById("b2").innerHTML;
    let c2 = document.getElementById("c2").innerHTML;
    let a3 = document.getElementById("a3").innerHTML;
    let b3 = document.getElementById("b3").innerHTML;
    let c3 = document.getElementById("c3").innerHTML;

    let output = document.getElementById("winResultOutput");
    let xWin = "x's won! Click on the board to reset the game!";
    let oWin = "o's won! Click on the board to reset the game!";
    let noWin = "It was a tie! Click on the board to reset the game!";

    let win1 = a1 && a1 == b1 && b1 == c1; // win in top row
    let win2 = a2 && a2 == b2 && b2 == c2; // win in middle row
    let win3 = a3 && a3 == b3 && b3 == c3; // win in bottom row
    let win4 = a1 && a1 == a2 && a2 == a3; // win in left column
    let win5 = b1 && b1 == b2 && b2 == b3; // win in middle column
    let win6 = c1 && c1 == c2 && c2 == c3; // win in right column
    let win7 = a1 && a1 == b2 && b2 == c3; // win in top left to bottom right diagonal
    let win8 = a3 && a3 == b2 && b2 == c1; // win in bottom left to top right diagonal
    let tie = a1 && a2 && a3 && b1 && b2 && b3 && c1 && c2 && c3; // no win but all spots are not null

    if(win1 || win4 || win7){ // check for top row, left column, and top left to bottom right diagonal win since they share a1 and we can check that for the winner
        a1 == "X" ? output.innerHTML = xWin : output.innerHTML = oWin;
        gameOver = true;
    } else if (win3 || win6) { // check for bottom row and right column since they share a c3 and we can check that for the winner
        c3 == "X" ? output.innerHTML = xWin : output.innerHTML = oWin;
        gameOver = true;
    } else if (win2 || win5 || win8) { // check for middle row and column as well as the bottom right to top left diagonal since they share b2
        b2 == "X" ? output.innerHTML = xWin : output.innerHTML = oWin;
        gameOver = true;
    } else if (tie) {
        output.innerHTML = noWin;
        gameOver = true;
    }
}