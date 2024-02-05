import os from 'node:os';

const eol = async () => {
  try {
    console.log(os.cpus());
  } catch {
    throw 'error';
  }
};

export default eol;
