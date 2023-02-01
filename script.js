const canvas = document.querySelector("canvas");

//*declare what gametype it is
const c = canvas.getContext("2d");

//*set canvas to the whole page
canvas.width = 1920;
canvas.height = 1080;

//*sets gravity value to add overtime
const gravity = 0.6;

//*make a class for the player
class Player {
  constructor() {
    //!give the Player a x, y, width and height
    this.postion = {
      x: 250,
      y: 100,
    };
    //!Give the Player gravity
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 30;
    this.height = 30;
  }

  //*draw the Player
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.postion.x, this.postion.y, this.width, this.height);
  }
  //*updates the Player every time
  update() {
    //!adds the gravity(velocity.y) the the y postion of the Player
    this.postion.y += this.velocity.y;
    this.postion.x += this.velocity.x;
    //*monitoring the bottom of Player
    if (this.postion.y + this.height + this.velocity.y <= canvas.height)
      //*makes the gravity accelerate over time
      this.velocity.y += gravity;
    //*if the bottom of the Player hits the bottom of the Canvas,
    //*stop putting gravity on it
    else this.velocity.y = 0;
  }
}

class Platform {
    constructor() {
        this.postion = {
            x: 600,
            y: 800
        }

        this.width = 200;
        this.height = 100;
    }

    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.postion.x, this.postion.y, this.width, this.height);
    }
}

const player = new Player();
const platform = new Platform();
//!define the keys we want to monitor
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function animate() {
  //*insert an argument that we want to loop
  requestAnimationFrame(animate);
  //!clears the whole canvas
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  player.draw();
  platform.draw();

  //?checks if Player has pressed the right or left key and
  //?move acordingly
  //*if the Player x axis has had the hav way mark stop moving
  if (keys.right.pressed && player.postion.x < window.innerWidth / 2) {
    player.velocity.x = 8;
  } else if (keys.left.pressed && player.postion.x > 200) {
    player.velocity.x = -8;
  } else {player.velocity.x = 0;
    if (keys.right.pressed){
        platform.postion.x -= 8
    }
    if (keys.left.pressed){
        platform.postion.x += 8
    }
  }

  //*platform collision detection
  if (player.postion.y + player.height <= platform.postion.y &&
     player.postion.y + player.height + player.velocity.y >=  platform.postion.y &&
     player.postion.x + player.width >= platform.postion.x &&  player.postion.x <= platform.postion.x + platform.width){
    player.velocity.y = 0
    console.log("a")
  }

  if (platform.postion.y + platform.height >= player.postion.y &&
    platform.postion.y <= player.postion.y + player.height  && 
    platform.postion.x + platform.width >= player.postion.x &&
      platform.postion.x <= player.postion.x + player.width){
    player.velocity.y = 0
    player.velocity.y = 10
    player.velocity.x = 0
    player.velocity.x = 1

    console.log('b')
  }

  if (player.postion.x + player.height >= platform.postion.x &&
    player.postion.x <= platform.postion.x &&
    player.postion.y + player.height >= platform.postion.y &&
    player.postion.y <= platform.postion.y + platform.height){
    player.velocity.x = 0
    player.velocity.x -= 1
    player.velocity.y = 10
    console.log('c')
 }


}

animate();

//end of Player script
//------------------------------------------------------------
//begin eventlisnters

//*addEventListener to listen for a keydown event mainly KeyD, KeyA and Space
window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    //*chekcs if KeyA has been pressed
    case 65:
      keys.left.pressed = true;
      break;
    //*chekcs if KeyD has been pressed
    case 68:
      keys.right.pressed = true;
      break;
    //*chekcs if Space has been pressed
    case 32:
      //*gives Player a upwards velocity
      player.velocity.y -= 20;
      break;
    //*chekcs if KeyS has been pressed
    case 83:
      break;
  }
});

//*addEventListener to listen for a keyup event mainly KeyD, KeyA and Space
window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    //*chekcs if KeyA has been lifted
    case 65:
      //*makes the Player stop moving
      keys.left.pressed = false;
      break;
    //*chekcs if KeyD has been lifted
    case 68:
      //*makes the Player stop moving
      keys.right.pressed = false;
      break;
    //*chekcs if Space has been lifted
    case 32:
      //*makes the Player stop moving
      player.velocity.y -= 0;
      break;
    //*chekcs if KeyS has been lifted
    case 83:
      //*makes the Player stop moving
      break;
  }
});
