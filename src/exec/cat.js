import fs from 'node:fs';
import promises from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';

const promisifiedStream = (path) =>
  new Promise((res, rej) => {
    try {
      fs.createReadStream(path)
        .pipe(process.stdout)
        .on('data', async () => {
          res();
        })
        .on('end', () => {
          rej();
        })
        .on('finish', () => {
          rej();
        })
        .on('error', () => {
          rej();
        })
        .on('close', () => {
          rej();
        })
        .on('exit', () => {
          rej();
        });
    } catch {
      rej();
    }
  });

const cat = async (path) => {
  try {
    await promises.access(path);
    await promisifiedStream(path);
  } catch (error) {
    throw 'error';
  }
};

export default cat;
