
//credit for help with this goes to Ben Cunningham's tutorial 

//https://www.youtube.com/watch?v=7PHhRrjgTDA


var score = 0;
var hit = false;  
var timer; 
var lives = 3; 




// Enemies our player must avoid
var Enemy = function(x,y,speed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	
	this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

var Heart = function() {
	

    //The image of the heart is added

    this.heart = 'images/Heart.png';
	
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	var multi = 30; 

if (score > 201 && score < 800) {
	multi = 100; 
}

if (score > 801 && score < 1000) {
	multi = 300; 
}
	

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;

    // Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -50;
        this.speed = multi + Math.floor(Math.random() * 250);
    };
	
	    // Checks for collisions between the player and the enemies
    if (player.x < this.x + 70 && player.x + 70 > this.x && player.y < this.y + 50 && 50 + player.y > this.y) {
		//lose life
		lives = lives -1;
		//used to change sprite
		hit = true; 		
		player.render(); 
		player.x = 202;
		player.y = 405;
		
    };
};

function reset() {
		
		 
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];

// Location of the 3 enemies on the y axis located on the stone road
var enemyLocation = [60, 140, 230];


// For each enemy located on the y axis from 0 on the x axis move at a speed of 200 
// Until randomly regenerated in the enemy update function above
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// Place the player object in a variable called player


var Player = function (x, y) {

    // Variables for the player to move along x and y axis 
    this.x = x;
    this.y = y;

    //The image of the player of horn-girl is added to the playing field 

    this.player = 'images/char-horn-girl.png';
	
};

// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (key) {

    // Enables user on left arrow key to move left on the x axis by 102
    // Also enables user not to go off the game tiles on the left side
    if (key == 'left' && this.x > 0) {
        this.x -= 102;
    };

    // Enables user on right arrow key to move right on the x axis by 102
    // Also enables user not to go off the game tiles on the right side
    if (key == 'right' && this.x < 405) {
        this.x += 102;
    };

    // Enables user on up arrow key to move upwards on the y axis by 83
    if (key == 'up' && this.y > 0) {
        this.y -= 83;
    };

    // Enables user on down arrow key to move downwards on the y axis by 83
    // Also enables user not to go off the game tiles on the bottom side
    if (key == 'down' && this.y < 405) {
        this.y += 83;
    };

    // Once the user reaches the top of the page; the water, the user is
    // Instantly reset to the starting position
    if (this.y < 0) {
		 
		//score increases by 200
			score += 200; 
        setTimeout(() => {
            this.x = 202;
            this.y = 405;			
        }, 800);
	
			
    };
};

Player.prototype.update = function (dt) {

};




// Renders the image of the user into the game
Player.prototype.render = function () {
	if (hit == true) {
		 this.player = 'images/dead-horn-girl.png';
		   setTimeout(() => {
            hit = false;			
        }, 800);
	
	}
	else {
	
		 this.player = 'images/char-horn-girl.png';
		 
	}
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Draw the heart on the screen, required method for game
Heart.prototype.render = function() {

	//if statement based on lives
	if (lives == 3) {
	ctx.drawImage(Resources.get(this.heart), 15, 525,40,50);
	ctx.drawImage(Resources.get(this.heart), 55, 525,40,50);
	ctx.drawImage(Resources.get(this.heart), 95, 525,40,50);
	}
	else if (lives == 2) {
	ctx.drawImage(Resources.get(this.heart), 15, 525,40,50);
	ctx.drawImage(Resources.get(this.heart), 55, 525,40,50);
	}
	else if (lives == 1){
    ctx.drawImage(Resources.get(this.heart), 15, 525,40,50);

	}
	else{
		score = 0; 
		lives = 3; 
	}
	//write score on screen
	ctx.font = "30px Arial";
	ctx.fillStyle = "yellow";
	ctx.fillText("Score: " + score,10,105);
};


var player = new Player(202, 405);
var heart = new Heart();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


