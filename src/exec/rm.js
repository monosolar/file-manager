import promises from 'node:fs/promises';

const rm = async (path) => {
  try {
    await promises.access(path);
    await promises.unlink(path);
  } catch {
    throw 'error';
  }
};

export default rm;
