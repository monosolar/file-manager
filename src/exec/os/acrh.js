import os from 'node:os';

const arch = async () => {
  try {
    console.log(os.arch());
  } catch {
    throw 'error';
  }
};

export default arch;
