import { createReadStream } from "fs";
import { resolve } from "path";
import { currentFolderAnnouncerAndPrompt } from "../utils/folderAnnouncer.js";
import { rl } from "../index.js";

export const read = async (filePath) => {
  const readableStream = createReadStream(resolve(filePath), "utf8");
  try {
    readableStream.on("data", (chunk) => {
      console.log(chunk);
    });
    readableStream.on("end", () => {
      currentFolderAnnouncerAndPrompt(process.cwd(), rl);
    });
  } catch (error) {
    console.error("Operation failed");
  }
};
