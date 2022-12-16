export const getFilename = async (input) => {
  return input.split(" ").slice(1).join("");
};

export const getPathAndFilename = async (input) => {
  return input.split(" ").slice(1)
};

export const getPath = async (input) => {
  return input.split(" ").slice(1)[0]
};

