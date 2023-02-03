const img = new Image();
img.onload = () => {
  
}
img.src = './assets/playerSrpite.png';
const canvas = document.querySelector("canvas");

//*declare what gametype it is
const c = canvas.getContext("2d");

//*set canvas to the whole page
canvas.width = 1920;
canvas.height = 977;

//*sets gravity value to add overtime
const gravity = 0.5;

//*make a class for the player
class Player {
  constructor() {
    //!give the Player a x, y, width and height
    this.postion = {
      x: 300,
      y: 600,
    };
    //!Give the Player gravity
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 37;
    this.height = 70;

    this.isJumping = true;
  }

  //*draw the Player
  draw() {
    if(img){
      c.save();
      c.drawImage(img, this.postion.x, this.postion.y);
      c.restore();
    }
  }

  //*updates the Player every time
  update() {
    //!adds the gravity(velocity.y) the the y postion of the Player
    this.postion.y += this.velocity.y;
    this.postion.x += this.velocity.x;
    //*monitoring the bottom of Player
    if (this.postion.y + this.height + this.velocity.y <= canvas.height) {
      //*makes the gravity accelerate over time
      this.velocity.y += gravity;
    }
    //*if the bottom of the Player hits the bottom of the Canvas,
    //*stop putting gravity on it
  }
}

class Npc {
  constructor() {
    this.postion = {
      x: 450,
      y: 790,
    };

    this.width = 30;
    this.height = 60;
  }

  draw() {
    c.fillStyle = "green";
    c.fill();
    c.fillRect(this.postion.x, this.postion.y, this.width, this.height);

    c.fillStyle = "black";
    c.font = "17px sans-serif";
    c.fillText("Talk to the me!", this.postion.x, this.postion.y);
  }
}

class Spike {
  constructor(x, y) {
    this.postion = {
      x,
      y,
    };

    this.width = 5;
    this.height = 50;
    this.coords = [90, -120, 60, 60, 120, 60];
  }

  draw() {
    c.save();
    c.fillStyle = "red";
    c.beginPath();
    c.moveTo(this.postion.x + this.coords[0], this.postion.y + this.coords[1]);
    c.lineTo(this.postion.x + this.coords[2], this.postion.y + this.coords[3]);
    c.lineTo(this.postion.x + this.coords[4], this.postion.y + this.coords[5]);
    c.fill();
    c.restore();
  }
}

class Platform {
  constructor(x, y, w, h) {
    this.postion = {
      x,
      y,
    };
    this.width = w;
    this.height = h;
  }

  draw() {
    c.save();
    c.fillStyle = "black";
    c.fill();
    c.fillRect(this.postion.x, this.postion.y, this.width, this.height);
    c.restore();
  }
}

const player = new Player();
const npc = new Npc();
const platforms = [
  //*border
  new Platform(-400, -100, 400, 1920),
  new Platform(2400, -900, 800, 8020),
  new Platform(0, -800, 2400, 400),
  //*platforms
  new Platform(0, 850, 1350, 300),
  new Platform(1550, 725, 250, 30),
  new Platform(1550, 220, 250, 30),
  new Platform(2020, 450, 250, 30),
  new Platform(880, 15, 250, 30),

  //*end
  new Platform(0, -100, 650, 30),
];
const spikes = [
  new Spike(1270, 977),
  new Spike(1310, 977),
  new Spike(1350, 977),
  new Spike(1390, 977),
  new Spike(1430, 977),
  new Spike(1470, 977),
  new Spike(1510, 977),
  new Spike(1550, 977),
  new Spike(1590, 977),
  new Spike(1630, 977),
  new Spike(1670, 977),
  new Spike(1710, 977),
  new Spike(1750, 977),
  new Spike(1790, 977),
  new Spike(1830, 977),
  new Spike(1870, 977),
  new Spike(1910, 977),
  new Spike(1950, 977),
  new Spike(1990, 977),
  new Spike(2030, 977),
  new Spike(2070, 977),
  new Spike(2110, 977),
  new Spike(2150, 977),
  new Spike(2190, 977),
  new Spike(2230, 977),
  new Spike(2270, 977),
  new Spike(2310, 977),
  new Spike(2350, 977),
  new Spike(2390, 977),
  new Spike(22270, 977),
  
];

//!define the keys we want to monitor
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  space: {
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
  npc.draw();
  spikes.forEach((spike) => {
    spike.draw();
  });
  platforms.forEach((platform) => {
    platform.draw();
  });

  //?checks if Player has pressed the right or left key and
  //?move acordingly
  //*if the Player x axis has had the hav way mark stop moving
  if (keys.right.pressed && player.postion.x < window.innerWidth / 2) {
    player.velocity.x = 8;
  } else if (keys.left.pressed && player.postion.x > 300) {
    player.velocity.x = -8;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      npc.postion.x -= 8;
      platforms.forEach((platform) => {
        platform.postion.x -= 8;
      });
      spikes.forEach((spike) => {
        spike.postion.x -= 8;
      });
    }
    if (keys.left.pressed) {
      npc.postion.x += 8;
      platforms.forEach((platform) => {
        platform.postion.x += 8;
      });
      spikes.forEach((spike) => {
        spike.postion.x += 8;
      });
    }
  }

  if (keys.space.pressed && player.postion.y < 310) {
    npc.postion.y += 10;
    platforms.forEach((platform) => {
      platform.postion.y += 10;
    });
    spikes.forEach((spike) => {
      spike.postion.y += 10;
    });
  }

  // if (player.postion.y < 350 && player.velocity.y > 1) {
  //   npc.postion.y -= 50;
  //   platforms.forEach((platform) => {
  //     platform.postion.y -= 50;
  //   });
  //   spikes.forEach((spike) => {
  //     spike.postion.y -= 50;
  //   });
  // }

  if (player.velocity.y > 21) {
    npc.postion.y -= 30;
    platforms.forEach((platform) => {
      platform.postion.y -= 30;
    });
    spikes.forEach((spike) => {
      spike.postion.y -= 30;
    });
  }

  spikes.forEach((spike) => {
    if (
      spike.postion.y + spike.height >= player.postion.y &&
      spike.postion.y <= player.postion.y + player.height &&
      spike.postion.x + spike.width >= player.postion.x &&
      spike.postion.x <= player.postion.x + player.width
    ) {
      window.location.reload();
      player.velocity.y = 0;
    }
  });



  platforms.forEach((platform) => {
    //*platform collision detection
    if (
      player.postion.y + player.height <= platform.postion.y &&
      player.postion.y + player.height + player.velocity.y >=
        platform.postion.y &&
      player.postion.x + player.width >= platform.postion.x &&
      player.postion.x <= platform.postion.x + platform.width
    ) {
      if ((player.isJumping = false)) {
        // window.location.reload();
      }
      player.velocity.y = 0;
    }

    if (
      platform.postion.y + platform.height >= player.postion.y &&
      platform.postion.y <= player.postion.y + player.height &&
      platform.postion.x + platform.width >= player.postion.x &&
      platform.postion.x <= player.postion.x + player.width
    ) {
      player.velocity.y = 0;
      player.velocity.y = 10;
      player.velocity.x = 0;
      player.velocity.x = 1;
    }

    if (
      player.postion.x + player.height >= platform.postion.x &&
      player.postion.x <= platform.postion.x &&
      player.postion.y + player.height >= platform.postion.y &&
      player.postion.y <= platform.postion.y + platform.height
    ) {
      player.velocity.x = 0;
      player.velocity.x -= 1;
      player.velocity.y = 10;
    }
  });
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
      keys.space.pressed = true;
      if (!player.isJumping) {
        player.velocity.y -= 20;
        player.isJumping = true;
      }

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
      keys.space.pressed = false;
      break;
    //*chekcs if KeyS has been lifted
    case 83:
      //*makes the Player stop moving
      break;
  }
});
