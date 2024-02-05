import os from 'node:os';

const username = async () => {
  try {
    console.log(os.userInfo.name);
  } catch {
    throw 'error';
  }
};

export default username;
