const wordArray = [
    {Brand: "SPECIALIZED", Photo: src="./assets/styles/images/specialized.jpg"},
    {Brand: "TREK", Photo: "./assets/styles/images/trek.jpeg"},
    {Brand: "DIAMONDBACK", Photo: "./assets/styles/images/diamondback.jpg"},
    {Brand: "INTENSE", Photo: "./assets/styles/images/intense.jpg"},
    {Brand: "COMMENCAL", Photo: "./assets/styles/images/commencal.jpg"},
    {Brand: "GIANT", Photo: "./assets/styles/images/giant.jpg"},
    {Brand: "GT", Photo: "./assets/styles/images/gt.jpeg"},
    {Brand: "MARIN", Photo: "./assets/styles/images/marin.jpg"},
    {Brand: "CANNONDALE", Photo: "./assets/styles/images/cannondale.jpg"}
];

const letterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let guessedLetters = [];
let correctGuessedLetters = [];
let guessesRemaining = 10;
let randomWord;
let randomPhotoDiv = document.getElementById("randomPhotoDiv");
const letterChoiceDiv = document.getElementById("letterChoiceDiv");
let lettersClass = document.getElementsByClassName("letter-");
let letterGuessed = false;
let points = 0;
let randomWordSpaces = [];
let lives = 5;

showLives = () => {
    document.getElementById("livesDiv").innerHTML = "Lives left: " + lives;
    if (lives === 0) {
        alert("You ran out of lives! Game Over...")
        location.reload();
    }
}
showLives();

// =========================================================================================
// Clears finished word
// Gives space for new word
newWord = () => {
    randomWord = "";
    resetSpaces();
}



// =========================================================================================
// Random Word Generator
randomWordGenerator = () => {
    randomWord = wordArray[Math.floor(wordArray.length * Math.random())];
    randomPhotoDiv.setAttribute("src", randomWord.Photo);    
    document.innerHTML = randomPhotoDiv;
}
randomWordGenerator();



// =========================================================================================
// Randomized word function
currentWordSpaces = () => {
    // For loop through the random word, for each, place a "_"
    for (let i = 0; i < randomWord.Brand.length; i++) {
        randomWordSpaces.push("_")
    }
}
currentWordSpaces();


// =========================================================================================
// Random Word array
let randomWordArray;
randomWordArrayFunc = () => {
    randomWordArray = randomWord.Brand.split("")
    console.log(randomWordArray)
}
randomWordArrayFunc();



// =========================================================================================
// Displays guessed letters
showGuessedLetters = () => {
    let lastLetter = guessedLetters.toString();
    document.getElementById("guessedLetters").innerHTML = "Guessed Letters: " + lastLetter;
}




// =========================================================================================
// Displays points gained
showPoints = () => {
    document.getElementById("pointsDiv").innerHTML = "Points: " + points;
}
showPoints();





// =========================================================================================
// Resets Spaces
resetSpaces = () => {
    document.getElementById("letterSpaces").innerHTML = " ";
}




// =========================================================================================
// Updates spaces with updated array
updateSpaces = () => {
    document.getElementById("letterSpaces").innerHTML += randomWordSpaces.join(" ");
}
updateSpaces();




// =========================================================================================
// Creates the letter buttons
createButtons = () => {
    for (let g = 0; g < lettersClass.length; g++) {
        let letters = document.createElement("button");
        lettersClass[g].appendChild(letters);
        letters.setAttribute("class", "letterButtons");
    }
}
createButtons();


// =========================================================================================
// Find the index of the selected and matching letter
getAllRandomWordIndexes = (array, e, i) => {
    if (e === event.target.id) {
        array.push(i);
    }
    return array;
}

// =========================================================================================
// Adds functionality to the buttons
clickFunctionality = () => {
    let buttonVar = document.querySelectorAll("button");
    for (let i = 0; i < buttonVar.length; i++) {
        buttonVar[i].addEventListener("click", function (event) {
            if (event.target && event.target.nodeName == "BUTTON") {
                if (guessedLetters.includes(event.target.id)) {
                    lives--;
                    showLives();
                    alert("You already guessed `" + event.target.id + "`, please guess another letter.")

                } else {
                    guessedLetters.push(event.target.id)
                    showGuessedLetters()
                    if (randomWord.Brand.includes(event.target.id)) {
                        // If letter exists in the word, find the index where it exists
                        // Match the index of the letter in the word to the index of "_" in other array
                        let randomWordIndexes = randomWordArray.reduce(getAllRandomWordIndexes, []);
                        for (let i = 0; i < randomWordIndexes.length; i++) {
                            let index = randomWordIndexes[i]
                            if (index !== -1) {
                                randomWordSpaces[index] = event.target.id
                                points++;
                                showPoints();
                                newWordAndSpaces();
                            }
                        }
                    } else {
                        lives--;
                        showLives();
                    }
                    resetSpaces();
                    updateSpaces();
                }
            }
        })
    }
}
clickFunctionality();




// =========================================================================================
// Label buttons with their value
labelButtons = () => {
    let buttonVar = document.querySelectorAll("button");
    for (let v = 0; v < letterArray.length; v++) {
        let stringLetter = String(letterArray[v]);
        buttonVar[v].setAttribute("id", stringLetter);
        buttonVar[v].setAttribute("onclick", "(event)");
        buttonVar[v].innerHTML = stringLetter;
    }
}
labelButtons();




// =========================================================================================
// Renders a new random word and spaces for the word
newWordAndSpaces = () => {
    if (randomWordSpaces.includes("_") == false) {
        newWord();
        randomWordGenerator();
        randomWordSpaces = [];
        guessedLetters = [];
        currentWordSpaces();
        randomWordArrayFunc();
        showGuessedLetters();
    }
}

