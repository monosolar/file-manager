import os from 'node:os';

const eol = async () => {
  try {
    console.log(os.EOL.split());
  } catch {
    throw 'error';
  }
};

export default eol;
