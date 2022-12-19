import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "process";
import { parseArgs } from "./cli/args.js";
import { currentFolderAnnouncerAndPrompt } from "./utils/folderAnnouncer.js";
import {
  getFilename,
  getPathAndFilename,
  getPath,
} from "./utils/filenameGetter.js";
import {
  path_to_working_directory,
  E_O_L,
  CPUs,
  user,
  architecture,
} from "./os/os.js";

import process from "process";

export const rl = readline.createInterface({ input, output });

const username = await parseArgs();
export let current_dir = process.chdir(path_to_working_directory);

console.log(`Welcome to the File Manager, ${username}!\n`);
console.log(`You are currently in ${path_to_working_directory}`);
rl.prompt();

rl.on("line", async (input) => {
  input = input.trim();

  switch (true) {
    case input.startsWith("up") || input === "..":
      (await import("./utils/up.js"))
        .up(process.cwd())
        .then(() => currentFolderAnnouncerAndPrompt(process.cwd(), rl));
      break;

    case input.startsWith("cd "):
      (await import("./fs/chdir.js"))
        .chdir(await getPath(input))
        .catch((error) => console.error(error))
        .then(() => {
          current_dir = process.cwd();
          currentFolderAnnouncerAndPrompt(process.cwd(), rl);
        });
      break;

    case input.startsWith("ls"):
      (await import("./fs/list.js"))
        .list(process.cwd())
        .catch((error) => console.error(error))
        .then(() => currentFolderAnnouncerAndPrompt(process.cwd(), rl));
      break;

    case input.startsWith("cat "):
      (await import("./streams/read.js"))
        .read(await getPath(input))
        .catch((error) => console.error(error));
      break;

    case input.startsWith("add "):
      (await import("./fs/create.js"))
        .create(await getFilename(input))
        .catch((error) => console.error(error))
        .then(() => currentFolderAnnouncerAndPrompt(process.cwd(), rl));
      break;

    case input.startsWith("rn "): {
      const [pathToFile, newFilename] = await getPathAndFilename(input);
      (await import("./fs/rename.js"))
        .renameF(pathToFile, newFilename)
        .catch((error) => console.error(error))
        .then(() => currentFolderAnnouncerAndPrompt(process.cwd(), rl));
      break;
    }
    case input.startsWith("cp "): {
      const [pathToFile, newFile] = await getPathAndFilename(input);
      (await import("./streams/copy.js"))
        .copy(pathToFile, newFile)
        .catch((error) => console.error(error))
        .then(() => currentFolderAnnouncerAndPrompt(process.cwd(), rl));
      break;
    }

    case input.startsWith("mv "): {
      const [pathToFile, newFile] = await getPathAndFilename(input);
      (await import("./streams/move.js"))
        .move(pathToFile, newFile)
        .catch((error) => console.error(error))
        .then(() => currentFolderAnnouncerAndPrompt(process.cwd(), rl));
      break;
    }
    case input.startsWith("rm "):
      (await import("./fs/delete.js"))
        .remove(await getPath(input))
        .catch((error) => console.error(error))
        .then(() => currentFolderAnnouncerAndPrompt(process.cwd(), rl));
      break;

    case input === "os --EOL".trim():
      console.log(E_O_L);
      currentFolderAnnouncerAndPrompt(process.cwd(), rl);
      break;

    case input === "os --cpus".trim():
      console.log(`Overall amount of CPUS - ${CPUs.length} \n`);
      console.log(CPUs);
      currentFolderAnnouncerAndPrompt(process.cwd(), rl);
      break;

    case input === "os --homedir".trim():
      console.log(path_to_working_directory);
      currentFolderAnnouncerAndPrompt(process.cwd(), rl);
      break;

    case input === "os --username".trim():
      console.log(user);
      currentFolderAnnouncerAndPrompt(process.cwd(), rl);
      break;

    case input === "os --architecture".trim():
      console.log(architecture);
      currentFolderAnnouncerAndPrompt(process.cwd(), rl);
      break;

    case input.startsWith("hash "):
      (await import("./hash/calcHash.js"))
        .calculateHash(await getPath(input))
        .catch((error) => console.error(error))
        .then(() => currentFolderAnnouncerAndPrompt(process.cwd(), rl));
      break;

    case input.startsWith("compress "): {
      const [pathToFile, pathToDestination] = await getPathAndFilename(input);
      (await import("./zip/compress.js"))
        .compress(pathToFile, pathToDestination)
        .catch((error) => console.error(error))
        .then(() => currentFolderAnnouncerAndPrompt(process.cwd(), rl));
      break;
    }

    case input.startsWith("decompress "): {
      const [pathToFile, pathToDestination] = await getPathAndFilename(input);
      (await import("./zip/decompress.js"))
        .decompress(pathToFile, pathToDestination)
        .catch((error) => console.error(error))
        .then(() => currentFolderAnnouncerAndPrompt(process.cwd(), rl));
      break;
    }

    default:
      console.log("Invalid input");
      break;
  }
  rl.prompt();
});

rl.on("SIGINT", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye! \n`);
  rl.close();
});
