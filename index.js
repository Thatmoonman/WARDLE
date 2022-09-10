//Establish Words class
class Words {
    constructor(word) {
        this.word = word
        this.children = word.split("")
    }
}

//establish two words, check shared chars are between 1-3, if not, pick new second word and try again
let word1 = new Words(randomWord())
let word2 = new Words(randomWord())

//NEW GAME!
let goodScore = 0
let goodGameRow
let badGameRow
let backIdx = 1
const form = document.getElementById("testword");
function newGame() {
    goodScore = 0
    newSet()
}
newGame()

//NEW SET!
function newSet() {
    word1 = new Words(randomWord())
    word2 = new Words(randomWord())
    word2 = wordChecker(word1, word2)

    reset()
    getGameRow(goodScore)

    //Show New Words in Console **FOR TESTING PURPOSES ONLY**
    // console.log(word1.word)
    // console.log(word2.word)
}

//button functionality
let newGameButton = document.getElementById("newGame")
newGameButton.addEventListener('click', newGame)
let hintButton = document.getElementById("hint")
hintButton.addEventListener('click', () => {
    let allLetters = []
    word1.children.forEach(ele => allLetters.push(ele))
    word2.children.forEach(ele => allLetters.push(ele))
    let hint = allLetters[Math.floor(Math.random()*10)]
    alert("There is at least one '" + hint.toUpperCase() + "'")

    form.children[0].focus()
})
let howToPlay = document.getElementById("howTo")
howToPlay.addEventListener('click', () => {
    alert("Guess real five-letter words. Try to solve the GREEN box WITHOUT solving the RED box! Guessed words appear to the right. Green means the letter is in the right place for the GOOD word, Red means right place for the BAD word, and a mix means they share a letter! A yellow letter means its in the wrong place, but be CAREFUL, you don't know which word its for! As you guess letters, they will be greyed out below. Get the GREEN box to the top to win! YOU CAN DO IT!")

    form.children[0].focus()
})
let sfx = document.getElementById("sfx")
sfx.addEventListener('click', () => {
    alert("pop, whizz, whooosh...ok I didn't do this part so you'll have to use your imagination.")

    form.children[0].focus()
})

//function to establish what row we are playing on
function getGameRow(goodScore) {
    
    const goodRowOne = document.getElementsByClassName("good")[0].getElementsByClassName("row one")[0]
    const goodRowTwo = document.getElementsByClassName("good")[0].getElementsByClassName("row two")[0]
    const goodRowThree = document.getElementsByClassName("good")[0].getElementsByClassName("row three")[0]
    const goodRowFour = document.getElementsByClassName("good")[0].getElementsByClassName("row four")[0]
    const goodRowFive = document.getElementsByClassName("good")[0].getElementsByClassName("row five")[0]
    const badRowOne = document.getElementsByClassName("bad")[0].getElementsByClassName("row one")[0]
    const badRowTwo = document.getElementsByClassName("bad")[0].getElementsByClassName("row two")[0]
    const badRowThree = document.getElementsByClassName("bad")[0].getElementsByClassName("row three")[0]
    const badRowFour = document.getElementsByClassName("bad")[0].getElementsByClassName("row four")[0]
    const badRowFive = document.getElementsByClassName("bad")[0].getElementsByClassName("row five")[0]

    if (goodScore === 0) {
        goodGameRow = goodRowThree
        goodRowThree.style.visibility = "visible"
        badGameRow = badRowThree
        badRowThree.style.visibility = "visible"
    } else if (goodScore === 1) {
        goodGameRow = goodRowTwo
        goodRowTwo.style.visibility = "visible"
        badGameRow = badRowFour
        badRowFour.style.visibility = "visible"
    } else if (goodScore === 2) {
        goodGameRow = goodRowOne
        goodRowOne.style.visibility = "visible"
        badGameRow = badRowFive
        badRowFive.style.visibility = "visible"
    } else if (goodScore === -1) {
        goodGameRow = goodRowFour
        goodRowFour.style.visibility = "visible"
        badGameRow = badRowTwo
        badRowTwo.style.visibility = "visible"
    } else if (goodScore === -2) {
        goodGameRow = goodRowFive
        goodRowFive.style.visibility = "visible"
        badGameRow = badRowOne
        badRowOne.style.visibility = "visible"

    } else if (goodScore === 3) {
        return youWin()
    } else if (goodScore === -3) {
        return youLose()
    } else {
        console.log("WTF?!")
    }

    let healthBar = document.getElementsByClassName("scoreboard")[0]
    if (goodScore === 0) {
        healthBar.innerHTML = "&#128528";
    } else if (goodScore === 1) {
        healthBar.innerHTML = "&#128515";
    } else if (goodScore === 2) {
        healthBar.innerHTML = "&#128525";
    } else if (goodScore === -1) {
        healthBar.innerHTML = "&#128577";
    } else if (goodScore === -2) {
        healthBar.innerHTML = "&#128560";
    }
}

//function to clear letters, reset background color, and hide rows
function reset() {
    const good = document.getElementsByClassName("good")[0]
    good.getElementsByClassName("row one")[0].style.visibility = "hidden"
    good.getElementsByClassName("row two")[0].style.visibility = "hidden"
    good.getElementsByClassName("row three")[0].style.visibility = "hidden"
    good.getElementsByClassName("row four")[0].style.visibility = "hidden"
    good.getElementsByClassName("row five")[0].style.visibility = "hidden"
    const bad = document.getElementsByClassName("bad")[0]
    bad.getElementsByClassName("row one")[0].style.visibility = "hidden"
    bad.getElementsByClassName("row two")[0].style.visibility = "hidden"
    bad.getElementsByClassName("row three")[0].style.visibility = "hidden"
    bad.getElementsByClassName("row four")[0].style.visibility = "hidden"
    bad.getElementsByClassName("row five")[0].style.visibility = "hidden"

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            good.children[i].children[j].innerHTML = ''
            good.children[i].children[j].style.backgroundColor = "rgba(149, 255, 0, 0.5)"
            bad.children[i].children[j].innerHTML = ''
            bad.children[i].children[j].style.backgroundColor = "rgba(255, 140, 0, 0.5)"
        }
    }

    const guesses = document.getElementById("guess")
    while (guesses.firstChild) {
        guesses.removeChild(guesses.firstChild)
    }

    let keyboard = Array.from(document.getElementsByClassName("key"))
    keyboard.forEach(ele => ele.removeAttribute("id"))

    form.children[0].focus()
}

//function for checking second word and recycling if not a match
function wordChecker(word1, word2) {
    if (!wordMatch(word1, word2)) {
        let word2 = new Words(randomWord())
        return wordChecker(word1, word2)    
    }
    return word2
}

//helper function for checking shared chars
function wordMatch(word1, word2) {
    let match = {}
    word1 = word1["word"]
    word2 = word2["word"]

    for (let i = 0; i < word1.length; i++) {
        let chr1 = word1[i]

        for (let j = 0; j < word1.length; j++) {
            let chr2 = word2[j]

            if (chr1 === chr2) {
                if (match[chr1]) {
                    match[chr1]++
                } else {
                    match[chr1] = 1
                }
            }
        }
    }

    let counter = 0
    for (let key in match) {
        if (match[key]) {
            counter += match[key]
        }
    }
    return 1 <= counter && counter <= 3
}

//Show New Words in Console **FOR TESTING PURPOSES ONLY**
// console.log(word1.word)
// console.log(word1.children)
// console.log(word2.word)
// console.log(word2.children)

//After letter input, move on to next input; prevent page reload on submit; handle form letters and reset game board
form.addEventListener("keyup", event => {
    let currentInput = event.target
    lastInput = form[5]
    if (currentInput !== lastInput && currentInput.value) {
        currentInput.nextElementSibling.focus()
    }
})
form.addEventListener('submit', function(event){event.preventDefault();})
form.addEventListener('submit', wordHandler);

//autofocus
const autofocus = setInterval(works, 60000)
function works() {
    form.children[0].focus()
}

//handle input letters and send them to valid word checker
function wordHandler() {
    const testLetterOne = form.letterone.value.toLowerCase()
    form.letterone.value = ''
    const testLetterTwo = form.lettertwo.value.toLowerCase()
    form.lettertwo.value = ''
    const testLetterThree = form.letterthree.value.toLowerCase()
    form.letterthree.value = ''
    const testLetterFour = form.letterfour.value.toLowerCase()
    form.letterfour.value = ''
    const testLetterFive = form.letterfive.value.toLowerCase()
    form.letterfive.value = ''
    let testWord = [testLetterOne, testLetterTwo, testLetterThree, testLetterFour, testLetterFive]
  
    dayNightCycle()

    return validWord(testWord)
}

//background changing function
let colors = [
    "linear-gradient(to bottom right, #9BF9F9, #74BDE0, #F8D49A, #F8BC9A)",
    "linear-gradient(to bottom right, #74BDE0, #F8D49A, #F8BC9A, #F99B9B)", 
    "linear-gradient(to bottom right, #F8D49A, #F8BC9A, #F99B9B, #F99BBC)", 
    "linear-gradient(to bottom right, #F8BC9A, #F99B9B, #F99BBC, #F49BF9)",
    "linear-gradient(to bottom right, #F99B9B, #F99BBC, #F49BF9, #C89BF9)",
    "linear-gradient(to bottom right, #F99BBC, #F49BF9, #C89BF9, #B29BF9)",
    "linear-gradient(to bottom right, #F49BF9, #C89BF9, #B29BF9, #A19BF9)",
    "linear-gradient(to bottom right, #C89BF9, #B29BF9, #A19BF9, #9BA6F9)",
    "linear-gradient(to bottom right, #B29BF9, #A19BF9, #9BA6F9, #9BCAF9)",
    "linear-gradient(to bottom right, #A19BF9, #9BA6F9, #9BCAF9, #9BECF9)",
    "linear-gradient(to bottom right, #9BA6F9, #9BCAF9, #9BECF9, #9BF9F9)",
    "linear-gradient(to bottom right, #9BCAF9, #9BECF9, #9BF9F9, #74BDE0)",
    "linear-gradient(to bottom right, #9BECF9, #9BF9F9, #74BDE0, #F8D49A)",
]
function dayNightCycle() {
    let backgroundColor = document.getElementsByTagName("body")[0]
    backgroundColor.style.background = colors[0]
    let colorShift = colors.shift()
    colors.push(colorShift)
}

//check for real word and pass on to tester
function validWord(testWord){
    // trie tree from dictionary.js?
    if (testWord.join("").length < 5 || !dictionary.includes(testWord.join(""))) {
        alert("Invalid Word")
        return form.children[0].focus()
    }
    wordTester(testWord, word1, word2)
}

let goodWord = [] //used to determine if solved without entering actual word
let badWord = []
//GAME LOGIC: compare letters of player entered word to good and bad words and style board
function wordTester(testWord, word1, word2) {
    guessWords(testWord)
    let currentGuess = new Words (testWord.join(""))
    let keyboard = Array.from(document.getElementsByClassName("key"))
    
    if (currentGuess.word === word1.word) {
        goodScore++
        return newSet()
    } else if (currentGuess.word === word2.word) {
        goodScore--
        return newSet()
    }
    
    for (let i = 0; i < 2; i++) {
        let goodWordObj = {}
        word1.children.forEach(ele => goodWordObj[ele] ? goodWordObj[ele]++ : goodWordObj[ele] = 1)
        let badWordObj = {}
        word2.children.forEach(ele => badWordObj[ele] ? badWordObj[ele]++ : badWordObj[ele] = 1)

        currentGuess.children.forEach((testLetter, testIdx) => {
            let guesses = document.getElementById("guess").children
            word1.children.forEach((letter, goodIdx) => {
                let goodLetter = goodGameRow.children[goodIdx]
           
                if (letter === testLetter && goodIdx === testIdx) {
                    goodLetter.style.backgroundColor = "lime"
                    goodLetter.innerHTML = letter.toUpperCase()
                    guesses[guesses.length - 1].children[testIdx].style.backgroundColor = "lime"
                    goodWord[goodIdx] = letter
                    goodWordObj[letter]--
                }
            })
            //change keyboard to show guessed letters
            keyboard.forEach(letter => {
                if (testLetter.toLowerCase() === letter.innerHTML.toLowerCase()) {
                    keyboard[keyboard.indexOf(letter)].setAttribute("id", "guessed")
                }
            })
    
        })

        currentGuess.children.forEach((testLetter, testIdx) => {
            let tempGoodWord = goodWordObj
            let guesses = document.getElementById("guess").children
            let yellow = false
            word1.children.forEach((letter, goodIdx) => {
                if (letter === testLetter && goodIdx !== testIdx && goodWord[testIdx] !== letter && badWord[testIdx] !== letter && tempGoodWord[letter] && !yellow) {
                    guesses[guesses.length - 1].children[testIdx].style.backgroundColor = "yellow"
                    tempGoodWord[letter]--
                    yellow = true
                }
            })
        })

        currentGuess.children.forEach((testLetter, testIdx) => {
            let guesses = document.getElementById("guess").children
            word2.children.forEach((letter, badIdx) => {
                let badLetter = badGameRow.children[badIdx]
            
                if(letter === testLetter && badIdx === testIdx && word1.word[testIdx] === testLetter) {
                    badLetter.style.backgroundColor = "orangered"
                    badLetter.innerHTML = letter.toUpperCase()
                    guesses[guesses.length - 1].children[testIdx].style.backgroundImage = 'linear-gradient(to bottom right, lime, orangered)'
                    badWord[badIdx] = letter
                    badWordObj[letter]--
                } else if(letter === testLetter && badIdx === testIdx) {
                    badLetter.style.backgroundColor = "orangered"
                    badLetter.innerHTML = letter.toUpperCase()
                    guesses[guesses.length - 1].children[testIdx].style.backgroundColor = 'orangered'
                    badWord[badIdx] = letter
                    badWordObj[letter]--
                } 
            })
        })

        currentGuess.children.forEach((testLetter, testIdx) => {
            let tempBadWord = badWordObj
            let guesses = document.getElementById("guess").children
            let yellow = false
            word2.children.forEach((letter, badIdx) => {
                if (letter === testLetter && badIdx !== testIdx && badWord[testIdx] !== letter && goodWord[testIdx] !== letter && tempBadWord[letter] && !yellow) {
                    guesses[guesses.length - 1].children[testIdx].style.backgroundColor = "yellow"
                    tempBadWord[letter]--
                    yellow = true
                }
            
            })

        })
    }

    console.log(badWord)
    console.log(word2.word)
    if (goodWord.join("") === word1.word && badWord.join("") !== word2.word) {
        goodScore++
        return newSet()
    } else if (goodWord.join("") !== word1.word && badWord.join("") === word2.word) {
        goodScore--
        return newSet()
    } else if (goodWord.join("") === word1.word && badWord.join("") === word2.word) {
        alert("tie")
        return newSet()
    }

    form.children[0].focus()
}

//helper function to build played words
function guessWords(testWord) {
    let guessWord = document.getElementById("guess")
    newWord = document.createElement("div")
    newLetterOne = document.createElement("div")
    newLetterOne.setAttribute("class", "letter")
    newLetterOne.appendChild(document.createTextNode(testWord[0]))
    newWord.appendChild(newLetterOne)
    newLetterTwo = document.createElement("div")
    newLetterTwo.setAttribute("class", "letter")
    newLetterTwo.appendChild(document.createTextNode(testWord[1]))
    newWord.appendChild(newLetterTwo)
    newLetterThree = document.createElement("div")
    newLetterThree.setAttribute("class", "letter")
    newLetterThree.appendChild(document.createTextNode(testWord[2]))
    newWord.appendChild(newLetterThree)
    newLetterFour = document.createElement("div")
    newLetterFour.setAttribute("class", "letter")
    newLetterFour.appendChild(document.createTextNode(testWord[3]))
    newWord.appendChild(newLetterFour)
    newLetterFive = document.createElement("div")
    newLetterFive.setAttribute("class", "letter")
    newLetterFive.appendChild(document.createTextNode(testWord[4]))
    newWord.appendChild(newLetterFive)
    newWord.style.display = "flex"
    guessWord.appendChild(newWord)

    function scrollDown() {
        let guessBox = document.getElementsByClassName("guessed")[0]
        guessBox.scrollTop = guessBox.scrollHeight
    }
    scrollDown()
}

//Win Animation
function youWin() {
    alert("YOU WIN!")
    newGame()
}

//Lose Animation
function youLose() {
    alert("YOU LOSE!")
    newGame()
}



/* 
TO DO:
set up WIN or LOSE endgame with NEW GAME BUTTON
better real word checker
improve rules button
make sfx
sfx button
*/

