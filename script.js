const canv = document.getElementById("canvas");
const context = canv.getContext("2d");
let eyes = [];
const amount = 120;
const mouse = {
  x: 0,
  y: 0,
};

canv.width = window.innerWidth;
canv.height = window.innerHeight;

document.addEventListener("mousemove", (e) => {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});

class Eye {
  constructor(radius, x, y) {
    this.radius = radius;
    this.x = x;
    this.y = y;
  }

  drawEye() {
    context.beginPath();
    context.fillStyle = "red";
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();

    // white
    const katet1 = mouse.x - this.x;
    const katet2 = mouse.y - this.y;
    const angle = Math.atan2(katet2, katet1);
    const offsetX = this.x + (Math.cos(angle) * this.radius) / 8;
    const offsetY = this.y + (Math.sin(angle) * this.radius) / 8;
    context.beginPath();
    context.fillStyle = "white";
    context.arc(offsetX, offsetY, this.radius / 1.3, 0, Math.PI * 2);
    context.fill();

    // black
    const offsetX1 = this.x + (Math.cos(angle) * this.radius) / 3;
    const offsetY1 = this.y + (Math.sin(angle) * this.radius) / 3;
    context.beginPath();
    context.fillStyle = "black";
    context.arc(offsetX1, offsetY1, this.radius / 2, 0, Math.PI * 2);
    context.fill();
  }
}

let overlapping = false;

const drawCircles = () => {
  while (eyes.length < amount) {
    let eye = {
      radius: Math.random() * (70 - 10) + 10,
      x: Math.random() * canv.width,
      y: Math.random() * canv.height,
    };
    overlapping = false;
    for (let i = 0; i <= eyes.length - 1; i++) {
      let dx = eye.x - eyes[i].x;
      let dy = eye.y - eyes[i].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < eye.radius + eyes[i].radius) {
        overlapping = true;
        break;
      }
    }
    if (!overlapping) {
      eyes.push(new Eye(eye.radius, eye.x, eye.y));
    }
  }
};

drawCircles();

const animateEye = () => {
  context.clearRect(0, 0, canv.width, canv.height);

  for (let eye of eyes) {
    eye.drawEye();
  }
  requestAnimationFrame(animateEye);
};

requestAnimationFrame(animateEye);

window.addEventListener("resize", () => {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
  eyes = [];
  drawCircles();
});

canv.addEventListener("click", (e) => {
  for (let i in eyes) {
    let eye = eyes[i];
    if (
      Math.pow(eye.x - e.pageX, 2) + Math.pow(eye.y - e.pageY, 2) <=
      Math.pow(eye.radius, 2)
    ) {
      eyes.splice(i, 1);
      for (let eye1 of eyes) {
        eye1.drawEye();
      }
    }
  }
});
