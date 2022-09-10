# **WARDLE**
---
WARDLE is a word game based off the popular game 'WORDLE', a daily obsession of mine that quickly became a part of my morning routine. Much like its namesake, WARDLE has you guessing five-letter words in the hopes of solving a randomly-generated word, recieving hints pertaining to the position of the letters in your guessed word based on its likeness to your target. WARDLE differs, however, in simultaneously presenting a second randomly-generated word, with some shared similarity to your target, that serves as a hazard. My goal with this project was to build something from scratch within a week using what I've learned in JAVASCRIPT, HTML, and CSS over the last two months. The end result of that goal is WARDLE!

In WARDLE, your goal is to solve a target word without solving a hazard word. Guessed words will appear in the box on the right with color coded letters (green: right placement in right word; red: right placement in the wrong word; green-red gradient: right placement in both words; yellow: wrong placement in at least one of the words; blue: letter does not appear in either word). As you guess letters, they will be greyed out in the alphabet below so you can see what you have not guessed yet. There is also a hint button if you are stuck. As you win or lose, the green or red boxes will shift up and down and the smiley face will demonstrate your progress by mirroring your success with happiness and failure with sadness. 

## Technologies
---
- Vanilla Javascript
- HTML/CSS

## Code Overview
---
Upon loading the game, two random words are generated with one to three shared characters. The game will then wait for the player to submit a valid word, which is checked against the pool of valid words in the same dictionary array that the target words are chosen from. Each letter is then indiviually checked against both the target and hazard words for likeness. Letters are displayed in the guessed words box accordingly based on that likeness and matching letters also appear in their respective target/hazard boxes. The alphabet will grey out letters that are newly guessed and the code will check if one or both of the target/hazard words has been solved. Lastly, the solved letters for both the target and hazard words will be checked for completion. You don't need to guess the correct word, just find all the correct letter positions. As a fun little easter egg I made it so with every guess the background color gradient will shift to mimic a day/night cycle of sorts.

Once any word is solved, the code will process the win, lose, or tie and shift the game board accordingly. Two new words will be generated, the list of guessed words is reset as is the guessed letters alphabet. Solve enough of either word in a row and you will Win or Lose, prompting an alert that you have done so and resetting the game back to start.
