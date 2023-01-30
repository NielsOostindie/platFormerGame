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