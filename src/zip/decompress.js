import { createUnzip } from "node:zlib";
import { createReadStream, createWriteStream } from "fs";
import { resolve, parse } from "path";


const unzip = createUnzip();

export const decompress = async (pathToFile, pathToDestination) => {
  const readableStream = createReadStream(resolve(pathToFile));
  const writableStream = createWriteStream(resolve(pathToDestination, `${parse(pathToFile).name}`));
  try {
    readableStream.pipe(unzip).pipe(writableStream);
  } catch (error) {
    console.error("Operation failed");
  }
};

