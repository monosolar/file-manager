import promises from 'node:fs/promises';

const ls = async (path) => {
  try {
    await promises.access(path);
    const list = await promises.readdir(path);

    const maxLength = { idx: 0, item: 0 };

    const table = await Promise.all(
      list.map(async (item, idx) => {
        const isFile = (await promises.lstat(`${path}/${item}`)).isFile();
        maxLength.idx = Math.max(maxLength.idx, `${idx}`.length);
        maxLength.item = Math.max(maxLength.item, item.length);

        return [idx, item, isFile];
      }),
    );

    console.log(
      `╔${'══'.repeat(maxLength.idx)}╦══${'═'.repeat(maxLength.item)}╦═══════╗`,
    );

    table.forEach((entry) => {
      console.log(
        '║',
        `${entry[0]}${' '.repeat(maxLength.idx - `${entry[0]}`.length)}`,
        '║',
        `${entry[1]}${' '.repeat(maxLength.item - entry[1].length)}`,
        '║',
        `${entry[2]}${entry[2] ? ' ' : ''}`,
        '║',
      );
    });

    console.log(
      `╚${'══'.repeat(maxLength.idx)}╩══${'═'.repeat(maxLength.item)}╩═══════╝`,
    );
  } catch (err) {
    throw 'error';
  }
};

export default ls;
