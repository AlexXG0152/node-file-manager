export const parseArgs = async () => {
  return process.argv.slice(2).join("").split("=")[1];
};

await parseArgs();
