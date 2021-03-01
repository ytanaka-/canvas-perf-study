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
    pathList[pathList.length - 1].push({ x, y })
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

const calcPathRectangle = (_pathList) => {
  const strokeMargin = 5 / 2 + 1;
  let minX, minY, maxX, maxY;
  for (let i = 0; i < _pathList.length; i++) {
    const path = _pathList[i];
    for (let j = 0; j < path.length - 1; j++) {
      const x = path[j].x;
      const y = path[j].y;
      if (!minX) {
        minX = x;
        minY = y;
        maxX = x;
        maxY = y;
      }
      if (x < minX) {
        minX = x;
      }
      if (x > maxX) {
        maxX = x;
      }
      if (y < minY) {
        minY = y;
      }
      if (y > maxY) {
        maxY = y;
      }
    }
  }
  return {
    x: minX - strokeMargin,
    y: minY - strokeMargin,
    // 矩形のwidthとheightは左右(上下)にmarginがあるので2倍した値を加える
    width: maxX - minX + strokeMargin * 2,
    height: maxY - minY + strokeMargin * 2
  }
}

let init = true;

const draw = () => {
  ctx.save();
  if (init) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    init = false;
  } else {
    const rec = calcPathRectangle(pathList);
    if (rec.x) {
      ctx.beginPath();
      ctx.rect(rec.x, rec.y, rec.width, rec.height);
      ctx.closePath();
      ctx.clip();
    }
  }
  // background
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
  for (let i = 0; i < pathList.length; i++) {
    const path = pathList[i];
    if (path.length < 2) {
      break;
    }
    for (let j = 0; j < path.length - 1; j++) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(path[j].x, path[j].y);
      ctx.lineTo(path[j + 1].x, path[j + 1].y);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
  }
  ctx.restore();
  requestAnimationFrame(draw);
}

draw();