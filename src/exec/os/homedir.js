import os from 'node:os';

const homedir = async () => {
  try {
    console.log(os.homedir());
  } catch {
    throw 'error';
  }
};

export default homedir;
