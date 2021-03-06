#!/usr/share/isis/node-v6.3.0-linux-x64/bin/node
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move few common/ modules in client/ folder
// END-HISTORY
// ====================================================================


const readline = require('readline');

const stream = readline.createInterface({
  input: process.stdin,
});

let totalSize = 0;
const duration = 5;

stream.on('line', (line) => {
  const size = parseInt(line.split(' ').slice(-1)[0], 10);
  if (size) {
    totalSize += size;
  }
});

const getSize = ({
  size,
  decimals,
  coef,
  convert,
} = {
  size: totalSize,
  decimals: 4,
  coef: duration,
  convert: s => s / (1024 * 1024),
}) =>
  Math.floor((convert(size) / coef) * (10 ** decimals)) / (10 ** decimals);

setInterval(() => {
  // eslint-disable-next-line no-console, "DV6 TBC_CNES Performance benchmarking, output on console"
  console.log(`${getSize()} Mb/s`);
  totalSize = 0;
}, duration * 1000);
