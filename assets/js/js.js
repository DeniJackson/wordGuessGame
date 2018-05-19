var words = ["tyrion","cersei","jon", "lannister", 'targaryen', 'greyjoy', 'walkers'] // Array with named characters
var pickedWord= words[Math.floor(Math.random()*words.length)]; //Picks random name from array
var tries = 11; //number if tries
var numberOfLetters = pickedWord.length; //number of letters in the random word
var correctLetters = 0; //number of letters guessed correctly by plater
var userguess; //initializing the variable for the users guess
var displayWord = document.getElementById("word"); //grabs the element that is supposed to show the wprd
var displayTries = document.getElementById("tries"); // grabs the element that shows the number of tries
var showWord; //initialized variable that is supposed to change dashed into letters.
var usedLettersArray = []; //initialized empty array to accept letters that have already been used
var usedLetters = document.getElementById('usedLetters'); // grabs the element where used letters will be shown
var message = document.getElementById('message');//grabs the message
var displayCorrectWord = document.getElementById('correctWord');//This is where the correct word will show up
var wins = 0; //initializing number of wins
var losses = 0; // initializing number lost
var winsDisplay = document.getElementById('wins'); //Used to display wins on screen
var lossesDisplay = document.getElementById('losses'); //Used to display loss
var resetButton = document.getElementById('reset'); //reset button to reset game
resetButton.addEventListener("click", function( event ) {
    reset();
  });

//This is a reset function to be called whenever the game is over. It resets the main variables needed.
function reset (){

    tries = 11;
    usedLettersArray = [];
    displayTries.textContent = 'Tries: ' +  tries;
    message.innerHTML = "";
    correctLetters = 0;
    pickedWord = words[Math.floor(Math.random()*words.length)];
    usedLetters.innerHTML = "Used Letters: " + usedLettersArray.toString();
    displayWord.textContent = "";
    for(i=0; i < pickedWord.length; i++){
        displayWord.append("_")
    }
}

//This creates a line of dashes as long as the random words length
for(i=0; i < pickedWord.length; i++){
    displayWord.append("_")
}

//this is the beginning of the key event. When the user guesses a letter, the computer checks to see if that letter has been used before. If it hasn't, it then checks to see if the letter is within the randomized word.
document.onkeyup = function(event){
showWord = displayWord.textContent; //Trying to update the text content to show letters correctly.
    
    
    if (tries > 0){
        
        displayTries.textContent = 'Tries: ' +  tries; //shows number of tries left on page
        userguess = event.key.toLowerCase(); //stores the users keypress intp a variable, and makes sure it is lowercase.
        
        //The beginning of the if else that checks whether a key has been pressed already
        if (usedLettersArray.indexOf(userguess) > -1){
            message.innerHTML = "Pick another letter"
        } else{
        //These next few lines pushes the user's keypress into the array, and then adds the value of the keypress onto the page where they can see it.
        usedLettersArray.push(userguess);
        usedLetters.innerHTML = "Used Letters: " + usedLettersArray.toString(); 
        //This waits until the user has pressed an unused key before decreasing the amount of tries.
        tries--;

        //Loops through all the letters in the random word to check if they match the user's guess
        for (i = 0; i < pickedWord.length; i++){
            
            //if they choose a correct letter, the number of correct letters goes up by one for each instance of the letter. Then the letters show up on the left, though this is bugged. 
            if(pickedWord[i] == userguess){
                correctLetters  += 1;
                showWord = showWord.replace(showWord[i], userguess);
                displayWord.innerHTML = showWord;
                
                //This is the win statement and condition
                     if (correctLetters == pickedWord.length){ 
                         displayCorrectWord.innerHTML = "The correct word is " + pickedWord + ".";
                        message.innerHTML = "You win! Now try again.";
                        wins+=1;
                       
                    }
            }
            }
}
   
    



    }   else{
        displayCorrectWord.innerHTML = "The correct word was " + pickedWord + ".";
        message.innerHTML = "You lose";
        losses+=1;
        

}
winsDisplay.innerHTML = "Won: " + wins;
lossesDisplay.innerHTML = "Lost: " + losses;
}