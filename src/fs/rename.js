import { rename } from "fs/promises";
import { resolve, dirname } from "path";

export const renameF = async (path, filename) => {
  try {
    await rename(resolve(path), resolve(dirname(path), filename));
  } catch (error) {
    console.error("Operation failed");
  }
};
