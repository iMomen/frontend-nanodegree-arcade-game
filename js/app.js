// Enemies our player must avoid
var Enemy = function (enemyX, enemyY, enemySpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = enemyX;
    this.y = enemyY;
    this.speed = enemySpeed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = 0;
        this.randomSpeed();
    }

    var enemyXLeft = this.x - 50.5,
        enemyXRight = this.x + 50.5,
        enemyYLeft = this.y - 65.5,
        enemyYRight = this.y + 65.5;

    if (player.x > enemyXLeft && player.x < enemyXRight && player.y > enemyYLeft && player.y < enemyYRight) {
        player.resetPlayer();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomSpeed = function () {
    var speedMultiply = Math.floor(Math.random() * 5 + 1);
    this.speed = 75 * speedMultiply;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Player
var PLAYER_X = 200,
    PLAYER_Y = 400,
    PLAYER_SCORE = 0,
    PLAYER_GEM_SCORE = 0;

var Player = function () {
    this.sprite = 'images/char-cat-girl.png';

    this.x = PLAYER_X;
    this.y = PLAYER_Y;

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function () {};

Player.prototype.handleInput = function (playerMove) {

    var xDirectionMove = 100;
    var yDirectionMove = 90;
    var validMove = true;

    switch (playerMove) {
    case 'left':
        if (this.x === 0) {
            document.getElementById('moveError').innerHTML = "You reach end of game board";
            return !validMove;
        }
        this.x -= xDirectionMove;
        break;
    case 'right':
        if (this.x === 400) {
            document.getElementById('moveError').innerHTML = "You reach end of game board";
            return !validMove;
        }
        this.x += xDirectionMove;
        break;
    case 'up':
        if (this.y === 40) {
            this.resetPlayer();
            PLAYER_SCORE++;
            document.getElementById('playerScore').innerHTML = PLAYER_SCORE;
            return !validMove;
        }
        this.y -= yDirectionMove;
        break;
    case 'down':
        if (this.y === 400) {
            document.getElementById('moveError').innerHTML = "Move Up";
            return !validMove;
        }
        this.y += yDirectionMove;
        break;
    default:
        document.getElementById('moveError').innerHTML = "Wrong move";
        return !validMove;
    }

};

Player.prototype.resetPlayer = function () {
    this.x = PLAYER_X;
    this.y = PLAYER_Y;
};

// GEMS
// Colors
var gems = [['blue', 100], ['green', 200], ['orange', 300]];

// X position
var gemXPositionArray = [0, 100, 200, 300, 400];
// Y Position
var gemYPositionArray = [145, 230, 315];

var Gem = function (gemX, gemY, gemValue, gemColor) {

    if (gemColor == 'blue') {
        this.sprite = 'images/Gem Blue.png';
    } else if (gemColor == 'green') {
        this.sprite = 'images/Gem Green.png';
    } else if (gemColor == 'orange') {
        this.sprite = 'images/Gem Orange.png';
    }

    this.x = gemX;
    this.y = gemY;
    this.value = gemValue;

};

Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.update = function () {

    var gemXLeft = this.x - 50.5,
        gemXRight = this.x + 50.5,
        gemYLeft = this.y - 65.5,
        gemYRight = this.y + 65.5;

    if (player.x > gemXLeft && player.x < gemXRight && player.y > gemYLeft && player.y < gemYRight) {
        PLAYER_GEM_SCORE = PLAYER_GEM_SCORE + this.value;
        document.getElementById('playerGemScore').innerHTML = PLAYER_GEM_SCORE;
        this.reCreateGem();
    }
};

Gem.prototype.reCreateGem = function () {
    var gemXPosition = Math.floor(Math.random() * (4)) + 0;
    this.x = gemXPositionArray[gemXPosition];
    
    var gemYPosition = Math.floor(Math.random() * (2)) + 0;
    this.y = gemYPositionArray[gemYPosition];
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var enemySpeed = Math.floor(Math.random() * 3 + 5) * 75;
    allEnemies.push(new Enemy(-200, 60 + 85 * i, enemySpeed));
}

var allGems = [];
for (var i = 0; i < 3; i++) {
    var gemColorsObject = Math.floor(Math.random() * (3)) + 0;
    var gemXPosition = Math.floor(Math.random() * (5)) + 0;
    var gemYPosition = Math.floor(Math.random() * (2)) + 0;
    
    allGems.push(new Gem(gemXPositionArray[gemXPosition], 60 + 85 * i, gems[gemColorsObject][1], gems[gemColorsObject][0]));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});