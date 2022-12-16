import process from "process";
import { resolve } from "path";

export const chdir = async (path) => {
  try {
    process.chdir(resolve(path));
  } catch (err) {
    console.error("Operation failed");
  }
};
