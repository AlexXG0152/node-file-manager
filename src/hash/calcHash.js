import { readFile } from "fs/promises";
import { createHash } from "node:crypto";
import { resolve } from "path";

export const calculateHash = async (path) => {
  try {
    const data = await readFile(resolve(path), "utf-8");
    const hex = createHash("sha256").update(data).digest("hex");
    console.log(hex);
  } catch (error) {
    console.error("Operation failed");
  }
};
