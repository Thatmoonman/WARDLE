//grab word dictionary and filter by 5 letter words
dictionary = words.filter(word => word.length === 5)

//Function for picking random words from 5 dictionary pool
const randomWord = () => dictionary[Math.floor(Math.random() * dictionary.length)]

window.onload = randomWord