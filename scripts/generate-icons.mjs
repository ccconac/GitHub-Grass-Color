import { mkdirSync, writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

const outputDir = new URL('../public/icons/', import.meta.url);
const sizes = [16, 32, 48, 128];

mkdirSync(outputDir, { recursive: true });

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);

  length.writeUInt32BE(data.length);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));

  return Buffer.concat([length, typeBuffer, data, crc]);
}

function insideRoundedRect(x, y, size, radius) {
  const left = radius;
  const right = size - radius - 1;
  const top = radius;
  const bottom = size - radius - 1;

  const nearestX = Math.max(left, Math.min(x, right));
  const nearestY = Math.max(top, Math.min(y, bottom));
  const dx = x - nearestX;
  const dy = y - nearestY;

  return dx * dx + dy * dy <= radius * radius;
}

function paintIcon(size) {
  const data = Buffer.alloc((size * 4 + 1) * size);
  const radius = size * 0.18;
  const margin = size * 0.17;
  const gap = Math.max(1, Math.round(size * 0.035));
  const cell = (size - margin * 2 - gap * 3) / 4;
  const colors = [
    [14, 68, 41, 255],
    [0, 109, 50, 255],
    [38, 166, 65, 255],
    [57, 211, 83, 255],
  ];

  for (let y = 0; y < size; y += 1) {
    const rowStart = y * (size * 4 + 1);
    data[rowStart] = 0;

    for (let x = 0; x < size; x += 1) {
      const offset = rowStart + 1 + x * 4;

      if (!insideRoundedRect(x, y, size, radius)) {
        data.set([0, 0, 0, 0], offset);
        continue;
      }

      data.set([36, 41, 47, 255], offset);

      for (let row = 0; row < 4; row += 1) {
        for (let col = 0; col < 4; col += 1) {
          const startX = margin + col * (cell + gap);
          const startY = margin + row * (cell + gap);
          const endX = startX + cell;
          const endY = startY + cell;

          if (x >= startX && x <= endX && y >= startY && y <= endY) {
            const colorIndex = (row * 3 + col * 2 + row * col) % colors.length;
            data.set(colors[colorIndex], offset);
          }
        }
      }
    }
  }

  return data;
}

function createPng(size) {
  const signature = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);
  const ihdr = Buffer.alloc(13);

  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(paintIcon(size), { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

for (const size of sizes) {
  writeFileSync(new URL(`icon-${size}.png`, outputDir), createPng(size));
}
