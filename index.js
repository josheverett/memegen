import express from 'express';
import canvasUtils from 'canvas';
const { createCanvas, loadImage, registerFont } = canvasUtils;

const PORT = 3000;

registerFont('impact.ttf', { family: 'Impact' });

function drawText (ctx, text, width, height, top) {
  const margin = height * 0.1;
  const lineHeight = width * 0.1;
  const lines = text.match(/.{1,24}(\s|$)/g);
  if (!top) lines.reverse();
  lines.forEach((line, i) => {
    const x = width * 0.5;
    let y = top ? margin : height - (margin * 0.5);
    y = top ? y + (lineHeight * i) : y - (lineHeight * i);
    ctx.strokeText(line, x, y);
    ctx.fillText(line, x, y);
  });
}

async function memegen (url, top, bottom) {
  const image = await loadImage(url);
  const { width, height } = image;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  ctx.lineCap = ctx.lineJoin = 'round';
  ctx.font = `${width * 0.07}px Impact`;
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
  ctx.lineWidth = 10;
  drawText(ctx, top, width, height, true);
  drawText(ctx, bottom, width, height, false);
  return canvas.toDataURL();
}

const server = express();

server.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
  });
});

server.get('/memegen', async (req, res) => {
  const meme = await memegen(
    'https://i.imgur.com/ddahAFd.png',
    'MADE A SIMPLE MEME GENERATOR',
    'IN ONLY 35 LINES OF JAVASCRIPT'
  );
  res.send(`<img src="${meme}">`);
});

server.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
