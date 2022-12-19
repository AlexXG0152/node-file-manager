import { createReadStream, createWriteStream } from "fs";
import { rm } from "fs/promises";
import { resolve, basename } from "path";

export const move = async (baseFile, destination) => {
  const readableStream = createReadStream(resolve(baseFile));
  const writableStream = createWriteStream(
    resolve(destination, basename(baseFile))
  );

  try {
    readableStream.pipe(writableStream);
    readableStream.on("close", function () {
      rm(resolve(baseFile));
    });
  } catch (error) {
    console.error("Operation failed");
  }
};
