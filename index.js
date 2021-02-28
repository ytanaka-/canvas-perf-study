const button = document.getElementById('clear');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = "#000000";
ctx.lineJoin = "round";
ctx.lineWidth = 5;
let pathList = [];
let isDraw = false;

const start = () => {
  isDraw = true;
  pathList.push([])
}
const move = (event) => {
  const x = event.clientX - event.target.getBoundingClientRect().left;
  const y = event.clientY - event.target.getBoundingClientRect().top;
  if (isDraw) {
    pathList[pathList.length-1].push({x,y})
    console.log(pathList);
  }
}
const end = () => {
  isDraw = false;
}

canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', move, false);
canvas.addEventListener('mouseup', end, false);
button.addEventListener('click', () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  pathList = [];
});

const draw = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // background
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
  for (let i = 0;i < pathList.length;i++) {
    const path = pathList[i];
    if (path.length < 2) {
      break;
    }
    for(let j = 0;j < path.length-1;j++) {
      ctx.beginPath();
      ctx.moveTo(path[j].x, path[j].y);
      ctx.lineTo(path[j+1].x, path[j+1].y);
      ctx.closePath();
      ctx.stroke();
    }
  }
  requestAnimationFrame(draw);
}

draw();