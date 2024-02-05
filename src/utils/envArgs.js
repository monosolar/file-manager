export const getEnvArgs = () => {
  const args = process.argv.slice(2) || [];

  const argsMap = args.reduce((acc, item) => {
    const [key, value] = item.replace('--', '').split('=');

    return { ...acc, [key]: value };
  }, {});

  return argsMap || {};
};
