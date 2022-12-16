import { writeFile } from "fs/promises";
import { resolve } from "path";
import { current_dir } from "../index.js";


export const create = async (filename) => {
  console.log(filename);
  try {
    await writeFile(resolve(current_dir, filename), "", { flag: "wx" });
  } catch (err) {
    console.error("Operation failed");
  }
};
