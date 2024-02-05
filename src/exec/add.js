import promises from 'node:fs/promises';

const add = async (path) => {
  try {
    await promises.writeFile(path, '');
  } catch {
    throw 'error';
  }
};

export default add;
