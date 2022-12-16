import { readdir } from "fs/promises";
import { resolve } from "path";

export const list = async (path) => {
  try {
    const fileList = (await readdir(resolve(path), { withFileTypes: true }))
      .map((d) => {
        const cur = { "Name": d.name };
        cur["Type"] = d["isDirectory"]() ? "directory" : "file";
        return cur;
      })
      .sort((a, b) => {
        return a.Type > b.Type
          ? 1
          : a.Type < b.Type
          ? -1
          : 0;
      });

    console.table(fileList);
  } catch (error) {
    console.error("Operation failed");
  } 
};
