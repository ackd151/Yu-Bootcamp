// Globals
const gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
const title = document.querySelector("h1");
let level = 0;

// Buttons
const greenBtn = document.querySelector("#green");
const redBtn = document.querySelector("#red");
const blueBtn = document.querySelector("#blue");
const yellowBtn = document.querySelector("#yellow");

// Audio
const greenAudio = new Audio("./sounds/green.mp3");
const redAudio = new Audio("./sounds/red.mp3");
const blueAudio = new Audio("./sounds/blue.mp3");
const yellowAudio = new Audio("./sounds/yellow.mp3");

// Button and Audio object
const btnAndAudio = [
  {
    btn: greenBtn,
    audio: greenAudio,
  },
  {
    btn: redBtn,
    audio: redAudio,
  },
  {
    btn: blueBtn,
    audio: blueAudio,
  },
  {
    btn: yellowBtn,
    audio: yellowAudio,
  },
];

// Animate button
const animate = (btn, audio) => {
  btn.classList.add("active");
  audio.play();
  setTimeout(function () {
    btn.classList.remove("active");
  }, 200);
};

// Add flash and sound to button clicks
for (const ba of btnAndAudio) {
  ba.btn.addEventListener("click", () => {
    ba.audio.play();
    ba.btn.className += " active";
    setTimeout(function () {
      ba.btn.classList.remove("active");
    }, 200);
  });
}

// Check game status
const checkPattern = (color) => {
  playerPattern.push(color);
  console.log(gamePattern, playerPattern);
  for (let i = 0; i < playerPattern.length; ++i) {
    if (gamePattern[i] !== playerPattern[i]) {
      new Audio("./sounds/wrong.mp3").play();
      gameOver();
    }
  }
  if (playerPattern.length === level) {
    if (JSON.stringify(gamePattern) != JSON.stringify(playerPattern)) {
      gameOver();
    } else {
      setTimeout(function () {
        nextLevel();
      }, 1500);
    }
  }
};

// Show game over
const gameOver = () => {
  const body = document.querySelector("body");
  body.classList.add("game-over");
  title.innerText = "GAME OVER!!! Press any key to start over";
  setTimeout(function () {
    body.classList.remove("game-over");
  }, 200);
  document.addEventListener("keydown", function () {
    location.reload();
  });
};

// Add button clicks to playerPattern / check game status
let playerPattern = [];
for (const ba of btnAndAudio) {
  ba.btn.addEventListener("click", checkPattern.bind(this, ba.btn.id));
}

// Show only next button in game pattern
const showNext = () => {
  switch (gamePattern[gamePattern.length - 1]) {
    case "green":
      animate(greenBtn, greenAudio);
      break;

    case "red":
      animate(redBtn, redAudio);
      break;

    case "blue":
      animate(blueBtn, blueAudio);
      break;

    case "yellow":
      animate(yellowBtn, yellowAudio);
      break;
  }
  playerPattern = [];
};

// Starts game
document.addEventListener("keydown", () => {
  nextLevel();
});

// Increment level
const nextLevel = () => {
  title.innerHTML = `Level ${++level}`;
  nextSequence();
  showNext();
};

// Get next color for game pattern
function nextSequence() {
  gamePattern.push(buttonColors[Math.floor(Math.random() * 4)]);
}
