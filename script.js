const canvas = document.querySelector("canvas");

//*declare what gametype it is
const c = canvas.getContext("2d");

//*set canvas to the whole page
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//*sets gravity value to add overtime
const gravity = 0.5;

//*make a class for the player
class Player {
  constructor() {
    //!give the Player a x, y, width and height
    this.postion = {
      x: 100,
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
    this.draw();
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

const player = new Player();
player.draw();

function animate() {
  //*insert an argument that we want to loop
  requestAnimationFrame(animate);
  //!clears the whole canvas
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
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
      console.log("this is left");
      //*gives Player a sidewards velocity
      player.velocity.x = -3;
      break;
    //*chekcs if KeyD has been pressed
    case 68:
      console.log("this is right");
      //*gives Player a sidewards velocity
      player.velocity.x = 3;
      break;
    //*chekcs if Space has been pressed
    case 32:
      console.log("this is up");
      //*gives Player a upwards velocity
      player.velocity.y -= 20;
      break;
    //*chekcs if KeyS has been pressed
    case 83:
      console.log("this is down");
      break;
  }
});


//*addEventListener to listen for a keyup event mainly KeyD, KeyA and Space
window.addEventListener("keyup", ({ keyCode }) => {
    switch (keyCode) {
      //*chekcs if KeyA has been lifted
      case 65:
        console.log("this is left");
         //*makes the Player stop moving
        player.velocity.x = 0;
        break;
      //*chekcs if KeyD has been lifted
      case 68:
        console.log("this is right");
        //*makes the Player stop moving
        player.velocity.x = 0;
        break;
      //*chekcs if KeyS has been lifted
      case 83:
        console.log("this is down");
        //*makes the Player stop moving
        break;
    }
  });