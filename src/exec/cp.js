import promises from 'node:fs/promises';

const cp = async (pathIn, pathOut) => {
  try {
    await promises.access(pathIn);
    await promises.cp(pathIn, pathOut, { recursive: true });
  } catch {
    throw 'error';
  }
};

export default cp;
