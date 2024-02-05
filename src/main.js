import { getEnvArgs } from './utils/envArgs.js';
import readline from 'node:readline';
import { homedir as osHomedir } from 'os';

import cat from './exec/cat.js';
import ls from './exec/list.js';
import eol from './exec/os/eol.js';
import cpus from './exec/os/cpus.js';
import arch from './exec/os/acrh.js';
import homedir from './exec/os/homedir.js';
import hash from './exec/hash.js';
import compress from './exec/compress.js';
import decompress from './exec/decompress.js';
import cp from './exec/cp.js';
import promises from 'node:fs/promises';
import add from './exec/add.js';
import rn from './exec/rn.js';
import mv from './exec/mv.js';
import rm from './exec/rm.js';

const username = getEnvArgs()['username'] || 'Mr. Unknown';
const userHomeDir = osHomedir();

// TODO - to enhance
const tailPathArr = [];

const getCurrentPath = () => {
  let path = `${userHomeDir}/${tailPathArr.join('/')}`;
  if (path.slice(-1) === '/') {
    path = path.slice(0, -1);
  }

  return path;
};

const getPathBy = (path) => {
  return `${getCurrentPath()}/${path}`;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`Welcome to the File Manager, ${username}!`, userHomeDir);

const recursiveAsyncReadLine = function () {
  rl.question(`You are currently in ${getCurrentPath()} > `, async (answer) => {
    const [cmd, ...args] = answer.split(' ').filter((item) => item.length > 0);

    // TODO .exit

    if (cmd === 'cd') {
      const path = args[0];

      try {
        await promises.access(getPathBy(path));
        tailPathArr.push(...path.split('/'));
      } catch (err) {
        console.log('Operation failed');
      }

      return recursiveAsyncReadLine();
    }

    if (cmd === 'up') {
      try {
        if (tailPathArr.length > 0) {
          tailPathArr.pop();
        }
      } catch (err) {
        console.log('Operation failed');
      }

      return recursiveAsyncReadLine();
    }

    if (cmd === 'ls') {
      try {
        await ls(getCurrentPath());
      } catch (err) {
        console.log('Operation failed');
      }

      return recursiveAsyncReadLine();
    }

    if (cmd === 'cat') {
      const path = args[0];

      try {
        await cat(getPathBy(path));
      } catch {
        console.log('Operation failed');
      }

      return recursiveAsyncReadLine();
    }

    if (cmd === 'cp') {
      const pathIn = args[0];
      const pathOut = args[1];

      try {
        await cp(getPathBy(pathIn), getPathBy(pathOut));
      } catch {
        console.log('Operation failed');
      }

      return recursiveAsyncReadLine();
    }

    if (cmd === 'add') {
      const path = args[0];

      try {
        await add(getPathBy(path));
      } catch {
        console.log('Operation failed');
      }

      return recursiveAsyncReadLine();
    }

    if (cmd === 'rm') {
      const path = args[0];

      try {
        await rm(getPathBy(path));
      } catch {
        console.log('Operation failed');
      }

      return recursiveAsyncReadLine();
    }

    if (cmd === 'rn') {
      const pathIn = args[0];
      const pathOut = args[1];

      try {
        await rn(getPathBy(pathIn), getPathBy(pathOut));
      } catch {
        console.log('Operation failed');
      }

      return recursiveAsyncReadLine();
    }

    if (cmd === 'mv') {
      const pathIn = args[0];
      const pathOut = args[1];

      try {
        await mv(getPathBy(pathIn), getPathBy(pathOut));
      } catch {
        console.log('Operation failed');
      }

      return recursiveAsyncReadLine();
    }

    if (cmd === 'hash') {
      const path = args[0];

      try {
        await hash(getPathBy(path));
      } catch {
        console.log('Operation failed');
      }

      return recursiveAsyncReadLine();
    }

    if (cmd === 'compress') {
      const pathIn = args[0];
      const pathOut = args[1];

      try {
        await compress(getPathBy(pathIn), getPathBy(pathOut));
      } catch {
        console.log('Operation failed');
      }

      return recursiveAsyncReadLine();
    }

    if (cmd === 'decompress') {
      const pathIn = args[0];
      const pathOut = args[1];

      try {
        await decompress(getPathBy(pathIn), getPathBy(pathOut));
      } catch {
        console.log('Operation failed');
      }

      return recursiveAsyncReadLine();
    }

    if (cmd === 'os') {
      const subCommand = args[0];

      try {
        if (subCommand === '--EOL') {
          eol();
          return recursiveAsyncReadLine();
        }
        if (subCommand === '--cpus') {
          cpus();
          return recursiveAsyncReadLine();
        }
        if (subCommand === '--architecture') {
          arch();
          return recursiveAsyncReadLine();
        }
        if (subCommand === '--username') {
          username();
          return recursiveAsyncReadLine();
        }
        if (subCommand === '--homedir') {
          homedir();
          return recursiveAsyncReadLine();
        }
      } catch (err) {
        console.log('Operation failed');
        return recursiveAsyncReadLine();
      }
    }

    console.log('Invalid input');

    return recursiveAsyncReadLine();
  });
};

recursiveAsyncReadLine();

process.on('SIGINT', function () {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);

  process.exit();
});
