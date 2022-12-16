import { parse } from "path";
import { chdir } from "../fs/chdir.js";

export const up = async (now) => {
  const pathNow = parse(now);
  try {
    if (pathNow.root !== pathNow.dir) {
      await chdir(pathNow.dir);
    } else {
      await chdir(pathNow.root);
    }
  } catch (error) {
    console.error('Operation failed');
  }
};
