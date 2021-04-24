// Get random die roll
const randomNumber1 = Math.ceil(Math.random() * 6);
const randomNumber2 = Math.ceil(Math.random() * 6);

// Generate die image src
const die1Src = `./images/dice${randomNumber1}.png`;
const die2Src = `./images/dice${randomNumber2}.png`;

// Get handle on dice img elements
const dice = document.querySelectorAll("img");
// const die2 = document.querySelector('.img2');

// Set die images
dice[0].setAttribute("src", die1Src);
dice[1].setAttribute("src", die2Src);

// Determine winner / true if winner
const player1 = randomNumber1 > randomNumber2,
  player2 = randomNumber1 < randomNumber2;

// Get handle on h1 element
const h1 = document.querySelector("h1");
h1.innerHTML =
  player1 === player2 ? "Draw!" : player1 ? "Player 1 Wins!" : "Player 2 Wins!";

document
  .querySelector(".button")
  .addEventListener("click", () => location.reload());

console.log(randomNumber1);
console.log(player1);
console.log(randomNumber2);
console.log(player2);
