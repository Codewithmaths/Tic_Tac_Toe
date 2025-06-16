let boxes = document.querySelectorAll(".box");
        let resetBtn = document.querySelector("#reset-btn");
        let newGameBtn = document.querySelector("#new-btn");
        let msgContainer = document.querySelector(".msg-container");
        let msg = document.querySelector("#msg");


        let player1NameInput = document.querySelector(".player1 input");
        let player2NameInput = document.querySelector(".player2 input");

        let turnO = true;
        let clickCount = 0;
        const winPattern = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8],
        ];

        const resetGame = () => {
            turnO = true;
            enableBoxes();
            msgContainer.classList.add("hide");
            clickCount = 0;


        }

        boxes.forEach((box) => {
            box.addEventListener("click", () => {
                if (!box.disabled) { // Check if the box is not disabled
                    clickCount++;
                    if (turnO) {
                        box.innerText = "O";
                        turnO = false;
                    } else {
                        box.innerText = "X";
                        turnO = true
                    }
                    box.disabled = true

                    checkWinner();
                }
            })
        });

        const disableBoxes = () => {
            for (let box of boxes) {
                box.disabled = true;
            }
        }
        const enableBoxes = () => {
            for (let box of boxes) {
                box.disabled = false;
                box.innerText = "";
            }
        }

        const showWinner = (winner) => {
            let winnerName = (winner === "O")? player1NameInput.value : player2NameInput.value;
            msg.innerText = `Congatulation,Winner is ${winnerName}`;
            msgContainer.classList.remove("hide");
            disableBoxes();
        };


        const checkWinner = () => {
            for (pattern of winPattern) {
                let pos1Val = boxes[pattern[0]].innerText;
                let pos2Val = boxes[pattern[1]].innerText;
                let pos3Val = boxes[pattern[2]].innerText;

                if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
                    if (pos1Val === pos2Val && pos2Val === pos3Val) {
                        showWinner(pos1Val);

                    }
                }
            }

            if (clickCount === 9) {
                // If click count reaches 9, all boxes are clicked and there is no winner
                msg.innerText = "It's a draw!";
                msgContainer.classList.remove("hide");
            }
        }

        newGameBtn.addEventListener("click", resetGame);

        resetBtn.addEventListener("click", resetGame)