import fs from 'node:fs';
import zlib from 'zlib';
import promises from 'node:fs/promises';

const promisifiedStream = (pathIn, pathOut) =>
  new Promise((res, rej) => {
    try {
      const readStream = fs.createReadStream(pathIn);
      const writeStream = fs.createWriteStream(pathOut);
      const brotli = zlib.createBrotliDecompress();
      const stream = readStream.pipe(brotli).pipe(writeStream);

      stream
        .on('finish', () => {
          res();
        })
        .on('error', () => {
          rej();
        });
    } catch {
      rej();
    }
  });

const decompress = async (pathIn, pathOut) => {
  try {
    await promises.access(pathIn);
    await promisifiedStream(pathIn, pathOut);
  } catch {
    throw 'error';
  }
};

export default decompress;
