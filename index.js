const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const jumpHeight= -20;

const gravity = 0.7;
class Sprite {
  constructor({position, velocity, color}) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.color = color;
    this.lastKey
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  upate() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if(this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
    } else {
      this.velocity.y += gravity;
    }
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'red'
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue'
});

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.upate();
  enemy.upate();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
  }else if (keys.d.pressed && player.lastKey == 'd') {
    player.velocity.x = 5;
  }

  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  }else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight') {
    enemy.velocity.x = 5;
  }
}

animate();

window.addEventListener('keydown', (event) => {
  console.log(event.key)

  switch (event.key) {
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd';
      break;
    case 'w':
      player.velocity.y = jumpHeight;
      break;

    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowUp':
      enemy.velocity.y = jumpHeight;
      break;
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;

    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
}
})