var player = document.querySelector(".player");
var shadow = document.querySelector(".shadow");
var score = document.querySelector(".score");
var livesLeft = document.querySelector(".lives");
var corona = document.querySelector(".corona");

window.addEventListener('keydown', onKeyboardEvent); // over heel het scherm moet gecheckt worden of een bepaalde key wordt ingedrukt

var keycode = { //pijltje naar boven, beneden, spatie en control zijn de mogelijke knoppen die je kan indrukken in deze game
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    CONTROL: 17
};

var jumping = false; // boolean om te kijken of de speler aan het springen is
var drop = false; // boolean om te kijken of de speler aan het bukken is

var jumpTimer;
var duckTimer;
var playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top')); // deze variabele controleert de top waarde van de speler, dit is nodig om de collision te bepalen

// belangrijk om te weten is dat de jump animatie in css is geschreven en met een klasse wordt aangeroepen in de js

function stopJumping() { // deze functie verwijdert de klasse jump na 500 milliseconden
    jumpTimer = setTimeout(function() {
        player.classList.remove("jump");
        playerTop = 290; // wanneer de sprong gedaan is zal deze terug een top hebben van 290
    }, 500);
}

function stopDucking() { // deze functie verwijdert de klasse ducking-speler na 500 milliseconden
    duckTimer = setTimeout(function() {
        player.classList.remove("ducking-player");
        playerTop = 290; // wanneer het bukken gedaan is zal deze terug een top hebben van 290 
    }, 500);
}

function onKeyboardEvent() { // functie om een event te plaatsen bij het indrukken van een knop
    switch (event.keyCode) {
        case keycode.UP: // pijltje naar boven --> kijken of speler al aan het springen is (if false) dan moet de speler springen
            if (jumping == false) {
                clearTimeout(duckTimer); // verwijdert de timeout meteen van het bukken zodat de speler tijdens een sprong meteen terug naar beneden kan gaan
                player.classList.add("jump");
                player.classList.remove("ducking-player");
                shadow.style.transform = "scale(0.5)";
                setTimeout(function(e) { // functie die de schaduw onder de speler verkleint tijdens het springen
                    shadow.style.transform = "scale(1)";
                }, 450);
                playerTop = 150; // de top positie tijdens de sprong is 150
                jumping = true; // jumping wordt tijdens het springen op true gezet zodat de gebruiker niet nog een keer kan springen tijdens de sprong
                stopJumping(); // initialiseren van de sprong
                jumping = false; // sprong moet dan terug op false staan na de timeout
            }
            break;
        case keycode.DOWN:
            if (drop == false) { // pijltje naar beneden --> kijken of speler al aan het bukken is (if false) dan moet de speler bukken
                clearTimeout(jumpTimer); // verwijdert de timeout meteen van het springen zodat de speler tijdens het bukken meteen terug kan springen
                player.classList.add("ducking-player");
                player.classList.remove("jump");
                playerTop = 325; // de top positie bij het bukken is 325
                drop = true; // drop wordt tijdens het bukken op true gezet zodat de gebruiker niet nog een keer kan bukken
                stopDucking(); // initialiseren van het bukken
                drop = false; // bukken moet dan terug op false staan na de timeout
            }
            break;
        case keycode.SPACE: // space doet hetzelfde als pijl naar boven
            if (jumping == false) {
                clearTimeout(duckTimer);
                player.classList.add("jump");
                player.classList.remove("ducking-player");
                shadow.style.transform = "scale(0.5)";
                setTimeout(function(e) {
                    shadow.style.transform = "scale(1)";
                }, 450);
                playerTop = 150;
                jumping = true;
                stopJumping();
                jumping = false;
            }
            break;
        case keycode.CONTROL: // control doet hetzelfde als pijl naar beneden
            if (drop == false) {
                clearTimeout(jumpTimer);
                player.classList.add("ducking-player");
                player.classList.remove("jump");
                playerTop = 325;
                drop = true;
                stopDucking();
                drop = false;
            }
            break;
    }
}

var counter = 0; // counter om de score bij te houden, deze staat standaard op 0

var counting = setInterval(scoreCounter, 100); // variabele voor de interval zodat die achteraf uit kan worden gezet indien de speler geen levens meer heeft

function scoreCounter() { // functie van de score counter die elke 100 milliseconden met 1 toeneemt
    counter++;
    score.innerHTML = "Score: " + counter; // print het dan op de voorziene plaats
}

var lives = 3; // standaard heeft de speler 3 levens
livesLeft.innerHTML = "Lives: " + lives;

var t = 0;
var l = 700;

var id = setInterval(move, 10); // variabele van de beweging van het coronadeeltje zodat die achteraf uit kan worden gezet indien de speler geen levens meer heeft

function move() { // functie om het corona deeltje te bewegen
    if (counter < 300) { // indien de score van de gebruiker kleiner is als 300 beweegt het coronadeeltje met een snelheid van -5px
        l = l - 5;
        corona.style.left = l + 'px';
    } else if (counter > 300 && counter < 600) { // indien de score van de gebruiker groter is als 300 en kleiner als 600 beweegt het coronadeeltje met een snelheid van -6px
        l = l - 6;
        corona.style.left = l + 'px';

        // aangeving op welk leven de gebruiker op dat moment zit
        document.querySelector(".level-1").classList.remove("display");
        document.querySelector(".level-1").classList.add("display-none");
        document.querySelector(".level-2").classList.add("display");
    } else if (counter > 600 && counter < 900) { // indien de score van de gebruiker groter is als 600 en kleiner als 900 beweegt het coronadeeltje met een snelheid van -7.5px
        l = l - 7.5;
        corona.style.left = l + 'px';

        // aangeving op welk leven de gebruiker op dat moment zit
        document.querySelector(".level-2").classList.remove("display");
        document.querySelector(".level-2").classList.add("display-none");
        document.querySelector(".level-3").classList.add("display");
    } else if (counter > 900 && counter < 1200) { // indien de score van de gebruiker groter is als 900 en kleiner als 1200 beweegt het coronadeeltje met een snelheid van -9px
        l = l - 9;
        corona.style.left = l + 'px';

        // aangeving op welk leven de gebruiker op dat moment zit
        document.querySelector(".level-3").classList.remove("display");
        document.querySelector(".level-3").classList.add("display-none");
        document.querySelector(".level-4").classList.add("display");
    } else if (counter > 1200) { // indien de score van de gebruiker groter is als 1200 beweegt het coronadeeltje met een snelheid van -12px
        l = l - 12;
        corona.style.left = l + 'px';

        // aangeving op welk leven de gebruiker op dat moment zit
        document.querySelector(".level-4").classList.remove("display");
        document.querySelector(".level-4").classList.add("display-none");
        document.querySelector(".level-5").classList.add("display");
    }

    if (l < -50) { // indien het coronadeeltje buiten het scherm valt, moet deze terug van rechts beginnen met een random top positie
        l = 700;
        corona.style.left = l + 'px';
        t = Math.floor(((Math.random() * 3)) + 1) * 50 + 200; // deze formule zorgt ervoor dat het coronadeeltje slechts op 3 willekeurige plaatsen spawnt
        corona.style.top = t + "px";
    }

    if (collision(l, t, 50, 50, 50, playerTop, 60, 110) == true) { // collision functie
        lives--;
        livesLeft.innerHTML = "Lives: " + lives;

        l = 700;
        corona.style.left = l + 'px';
        t = Math.floor(((Math.random() * 3)) + 1) * 50 + 200; // deze formule zorgt ervoor dat het coronadeeltje slechts op 3 willekeurige plaatsen spawnt
        corona.style.top = t + "px";

        if (lives <= 0) { // als de speler geen levens meer heeft, dan stopt de teller en het moven van het coronadeeltje en wordt de klasse game over toegevoegd
            clearInterval(counting);
            clearInterval(id);
            corona.classList.add("display-none");
            document.querySelector(".game-over").classList.remove("display-none"); // tonen van het game over scherm
            document.querySelector(".final-score").innerHTML = "Your score: " + counter;
        }
    }
}

function collision(x1, y1, w1, h1, x2, y2, w2, h2) { // de algemene functie van de collision
    if (((x1 + w1 - 1) < x2) ||
        ((x2 + w2 - 1) < x1) ||
        ((y1 + h1 - 1) < y2) ||
        ((y2 + h2 - 1) < y1)) {
        return false;
    } else {
        return true;
    }
}