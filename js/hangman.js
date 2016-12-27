/**
 * Showing off how to display/hide parts of a SVG-image.
 */
window.Hangman = (function() {
    "use strict";

    var hangman = {

        "theWord": "",
        "guessed": [],
        "failed": 0,
        "hiddenWord": "",
        "Letterfound": "",



        // Get all elements as their id
        "partAsElement": {
            "hill":     document.getElementById('hang_hill'),
            "gallow":   document.getElementById('hang_construction'),
            "body":     document.getElementById('hang_body'),
            "rightarm": document.getElementById('hang_rightarm'),
            "leftarm":  document.getElementById('hang_leftarm'),
            "rightleg": document.getElementById('hang_rightleg'),
            "leftleg":  document.getElementById('hang_leftleg'),
            "rope":     document.getElementById('hang_rope'),
            "head":     document.getElementById('hang_head')
        },

        // Create an array with all valid parts
        "validParts": [
            "hill",
            "gallow",
            "body",
            "rightarm",
            "leftarm",
            "rightleg",
            "leftleg",
            "rope",
            "head"
        ],

        "words": [
        'fotboll',
        'gym',
        'karlskrona',
        'bil',
        'bth'
        ],


        "wordList": function()
        {
            for (var i = 0; i < this.words.length; i++) {
                console.log("word: " + this.words[i]);
            }
        },

        "peek": function() {
            console.log(this.theWord);

        },

        "randomWord": function () {
            this.theWord = this.words[Math.floor(Math.random() * this.words.length)];
            return this.theWord;
        },

        //convert hidden word to "_"
        "hideWord": function() {
            for (var i = 0; i < this.theWord.length; i++) {
                this.hiddenWord += "_ ";
            }
        },

        "insertGuessedLetter": function(letter) {
            this.guessed.push(letter);
        },

        "displayGuessedLetters": function() {
            var guessLetters =  document.getElementById("guess");
            guessLetters.textContent = "";
            for (var i = 0; i < this.guessed.length; i++) {
                guessLetters.textContent += this.guessed[i] + ", ";
            }
        },

        "ProcessGameLogic": function(letter) {
            this.letterFound = false;
            for (var i = 0; i < this.theWord.length; i++) {
                if(this.theWord[i] == letter)
                {
                    this.letterFound = true;
                    this.hiddenWord = replaceAt(this.hiddenWord, i, letter);
                    var element = document.getElementById("correctWordsStatus");
                    element.textContent = this.hiddenWord;
                }
            }

            if(this.letterFound === false)
            {
                this.show(this.validParts[this.failed]);
                this.failed++;

                if(this.failed == 9)
                {
                    var buttons = document.querySelectorAll(".btn");
                    for (var j = 0; j < buttons.length; j++) {
                        buttons[j].disabled = true;
                    }

                    var gameStatus = document.getElementById("gameOver");
                    gameStatus.innerHTML = "GAME OVER <br>";
                    var btn = document.createElement("BUTTON");
                    btn.className = "restart";
                    btn.textContent = "Restart";
                    gameStatus.appendChild(btn);

                    btn.onclick = function() {
                        window.location.href=window.location.href;
                    };
                }
            }
        },





        /**
         * Check if part a valid part, writes error message to console if the part is invalid.
         *
         * @param string part Name of the part to check.
         *
         * @returns boolean true if valid part, else false.
         */
        "isValid": function (part) {

            if (this.validParts.indexOf(part) === -1) {
                console.log("The part is not valid: " + part);
                return false;
            }
            console.log("The part is valid: " + part);
            return true;

        }, 


        /**
         * Hide a part.
         *
         * @param string part Name of the part to hide.
         *
         * @returns void.
         */
        "hide": function (part) {

            if (this.isValid(part)) {
                console.log("Hiding part: " + part);
                this.partAsElement[part].style.display = "none";
            }

        }, 


        /**
         * Show a part.
         *
         * @param string part Name of the part to show.
         *
         * @returns void.
         */
        "show": function (part) {

            if (this.isValid(part)) {
                console.log("Showing part: " + part);
                this.partAsElement[part].style.display = "inline";
            }

        }
    };

    function replaceAt(s, n, t) {
        return s.substring(0, 2*n) + t + s.substring(2*n + 1);
    }

        //click on the buttons to make it selected
        var buttons = document.querySelectorAll(".btn");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function()
            {
                this.classList.add("selected");
                var currentLetter = this.textContent.toLowerCase();
                if(hangman.guessed.indexOf(currentLetter) === -1)
                {
                    hangman.ProcessGameLogic(currentLetter);
                    hangman.insertGuessedLetter(currentLetter);
                    hangman.displayGuessedLetters();
                    
                    if(hangman.hiddenWord.indexOf("_") === -1 )
                    {
                        var buttons = document.querySelectorAll(".btn");
                        for (var i = 0; i < buttons.length; i++) {
                            buttons[i].disabled = true;
                        }

                        var gameStatus = document.getElementById("gameCompleted");
                        gameStatus.innerHTML = "You Won!<br>";
                        var btn = document.createElement("BUTTON");
                        btn.className = "restart";
                        btn.textContent = "Restart";
                        gameStatus.appendChild(btn);

                        btn.onclick = function() {
                            window.location.href=window.location.href;
                        };
                    }

                }
    
            };
        }

        //Hide all parts
        for (i = 0; i < hangman.validParts.length; i++) {
            hangman.hide(hangman.validParts[i]);
        }
        var elem = document.getElementById("correctWordsStatus");
        hangman.randomWord();
        hangman.hideWord();
        elem.textContent = hangman.hiddenWord;


    console.log("You can now use the hangman object as a part of the window-object. Try\n\nwindow.Hangman.hide('gallow')\nwindow.Hangman.show('gallow')\n\nHere are all the parts you can work on.");
    console.log(hangman.validParts);
    console.log(hangman);

    // Return the object to make it visible.
    return hangman;
})();
