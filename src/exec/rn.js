import promises from 'node:fs/promises';

const rn = async (pathIn, pathOut) => {
  try {
    await promises.access(pathIn);

    await promises.rename(pathIn, pathOut);
  } catch (error) {
    throw 'error';
  }
};

export default rn;
