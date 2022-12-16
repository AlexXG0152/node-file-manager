export const currentFolderAnnouncerAndPrompt = async (current_dir, rl) => {
  console.log(`You are currently in ${current_dir}`);
  rl.prompt();
};
