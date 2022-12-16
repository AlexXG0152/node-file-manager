import { rm } from "fs/promises";
import { resolve } from "path";

export const remove = async (path) => {
  try {
    await rm(resolve(path));
  } catch (error) {
    console.error("Operation failed");
  }
};

await remove();
