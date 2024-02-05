import promises from 'node:fs/promises';

const mv = async (pathIn, pathOut) => {
  try {
    await promises.access(pathIn);
    await promises.cp(pathIn, pathOut, { recursive: true });
  } catch {
    throw 'error';
  }
};

export default mv;
