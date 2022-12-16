import { createReadStream, createWriteStream } from "fs";
import { resolve, basename } from "path";

export const copy = async (baseFile, destination) => {
  const readableStream = createReadStream(resolve(baseFile));
  const writableStream = createWriteStream(resolve((destination), basename(baseFile)));

  try {
    readableStream.pipe(writableStream);
  } catch (error) {
    console.error("Operation failed");
  }
};
