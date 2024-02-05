import crypto from 'crypto';
import fs from 'node:fs';
import promises from 'node:fs/promises';

const promisifiedStream = (path) =>
  new Promise((res, rej) => {
    const hash = crypto.createHash('sha256');

    fs.createReadStream(path)
      .on('data', (data) => {
        hash.update(data);
      })
      .on('end', () => {
        res(hash.digest('hex'));
      })
      .on('error', () => {
        rej();
      });
  });

const hash = async (path) => {
  try {
    await promises.access(path);
    const hash = await promisifiedStream(path);
    console.log('hash', hash);
  } catch (error) {
    throw 'error';
  }
};

export default hash;
