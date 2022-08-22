//serverlib.js
exports.isFileExtension = function (fileName, extension) {
  if (extension === undefined) return true;

  let spt = fileName.split(".");
  let length = spt.length;

  if (spt[length - 1].toUpperCase() === extension.toUpperCase()) return true;

  return false;
};

/* window */
exports.changeBlankFileNameWindow = function (fileName) {
  let newFileName = fileName;

  if (newFileName.includes(" ")) newFileName = `'${fileName}'`;

  return newFileName;
};

/* linux */
exports.changeBlankFileNameLinux = function (fileName) {
  let newFileName = "";

  for (let i = 0; i < fileName.length; i++) {
    if (fileName[i] === " ") newFileName += "\\";
    newFileName += fileName[i];
  }

  return newFileName;
};
