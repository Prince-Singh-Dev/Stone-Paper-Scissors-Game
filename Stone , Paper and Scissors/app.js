let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const body = document.querySelector("body");

// Function to generate computer choice
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

// Function to handle a draw game
const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

// Function to trigger confetti animation
const triggerConfetti = () => {
  const confettiContainer = document.createElement("div");
  confettiContainer.classList.add("confetti");

  for (let i = 0; i < 50; i++) {
    const confettiPiece = document.createElement("div");
    confettiPiece.classList.add("confetti-piece");
    confettiPiece.style.left = Math.random() * 100 + "vw";
    confettiPiece.style.animationDelay = Math.random() * 2 + "s";
    confettiPiece.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confettiContainer.appendChild(confettiPiece);
  }

  body.appendChild(confettiContainer);

  // Remove confetti after animation ends
  setTimeout(() => {
    confettiContainer.remove();
  }, 3000);
};

// Function to display winner message
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";

    // Create and display the win message
    const winMessage = document.createElement("div");
    winMessage.classList.add("win-message");
    winMessage.innerText = "Congratulations! You Won 🎉";
    body.appendChild(winMessage);

    // Trigger confetti
    triggerConfetti();

    // Remove the win message after 3 seconds
    setTimeout(() => {
      winMessage.remove();
    }, 3000);
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

// Main game logic
const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;

    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }

    showWinner(userWin, userChoice, compChoice);
  }
};

// Event listeners for user choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
