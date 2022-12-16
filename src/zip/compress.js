import { createGzip } from "node:zlib";
import { createReadStream, createWriteStream } from "fs";
import { resolve, basename } from "path";

const gzip = createGzip();

export const compress = async (pathToFile, pathToDestination) => {
  const readableStream = createReadStream(resolve(pathToFile));
  const writableStream = createWriteStream(resolve(pathToDestination, `${basename(pathToFile)}.gz`));
  try {
    readableStream.pipe(gzip).pipe(writableStream);
  } catch (error) {
    console.error("Operation failed");
  }
};
