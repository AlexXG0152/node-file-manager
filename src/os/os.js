import { homedir, EOL, cpus, userInfo, arch } from "os";

export const path_to_working_directory = homedir();

export const E_O_L = JSON.stringify(EOL);

const CPU = cpus();
CPU.forEach((object) => delete object["times"]);
export const CPUs = CPU;

export const user = userInfo().username;

export const architecture = arch();
