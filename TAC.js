const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
const playAgainBtn = document.querySelector(".play-again");

const winnerBox = document.querySelector(".winner");
const msg = document.querySelector("#msg");

const turnText = document.querySelector(".turn");

const scoreOElement = document.querySelector("#scoreO");
const scoreXElement = document.querySelector("#scoreX");

let turnO = true;
let scoreO = 0;
let scoreX = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (box.innerText !== "") return;

        if (turnO) {
            box.innerText = "O";
            box.style.color = "#00E5FF";
            turnO = false;
            turnText.innerText = "Current Turn: X";
        } else {
            box.innerText = "X";
            box.style.color = "#FF4D6D";
            turnO = true;
            turnText.innerText = "Current Turn: O";
        }

        box.disabled = true;

        const winnerFound = checkWinner();

        if (!winnerFound) {
            checkDraw();
        }
    });
});

function checkWinner() {

    for (let pattern of winPatterns) {

        const pos1 = boxes[pattern[0]].innerText;
        const pos2 = boxes[pattern[1]].innerText;
        const pos3 = boxes[pattern[2]].innerText;

        if (
            pos1 !== "" &&
            pos2 !== "" &&
            pos3 !== ""
        ) {

            if (
                pos1 === pos2 &&
                pos2 === pos3
            ) {

                boxes[pattern[0]].classList.add("win");
                boxes[pattern[1]].classList.add("win");
                boxes[pattern[2]].classList.add("win");

                showWinner(pos1);

                return true;
            }
        }
    }

    return false;
}

function checkDraw() {

    let draw = true;

    boxes.forEach((box) => {
        if (box.innerText === "") {
            draw = false;
        }
    });

    if (draw) {

        msg.innerText = "It's a Draw!";

        winnerBox.classList.remove("hide");

        disableBoxes();
    }
}

function showWinner(winner) {

    if (winner === "O") {

        scoreO++;
        scoreOElement.innerText = `O : ${scoreO}`;

    } else {

        scoreX++;
        scoreXElement.innerText = `X : ${scoreX}`;
    }

    msg.innerText = `Winner is ${winner}!`;

    winnerBox.classList.remove("hide");

    disableBoxes();
}

function disableBoxes() {

    boxes.forEach((box) => {
        box.disabled = true;
    });
}

function enableBoxes() {

    boxes.forEach((box) => {

        box.disabled = false;

        box.innerText = "";

        box.style.color = "#111827";

        box.classList.remove("win");
    });
}

function resetGame() {

    turnO = true;

    turnText.innerText = "Current Turn: O";

    winnerBox.classList.add("hide");

    enableBoxes();
}

playAgainBtn.addEventListener("click", () => {
    resetGame();
});

resetBtn.addEventListener("click", () => {

    scoreO = 0;
    scoreX = 0;

    scoreOElement.innerText = "O : 0";
    scoreXElement.innerText = "X : 0";

    resetGame();
});

/* Optional Keyboard Shortcut */

document.addEventListener("keydown", (e) => {

    if (e.key.toLowerCase() === "r") {

        scoreO = 0;
        scoreX = 0;

        scoreOElement.innerText = "O : 0";
        scoreXElement.innerText = "X : 0";

        resetGame();
    }
});