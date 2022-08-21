// library.js
const DELIMITER = ",";
const APOSTROPHE = '"';

export const handleOnDragLeave = (e, setState) => {
  e.preventDefault();
  setState(false);
  return false;
};

export const handleDragOver = (e, setState) => {
  e.preventDefault();
  setState(true);
  return false;
};

export const handleOnDrop = (e, setState, csvObject) => {
  e.preventDefault();

  let file = e.dataTransfer.files[0];
  let fileReader = new FileReader();

  fileReader.readAsText(file, "utf-8"); // or euc-kr

  fileReader.onload = function () {
    //console.log(fileReader.result);
    parsingCsv(fileReader.result, csvObject);
    return;
  };

  setState(false);
  return false;
};

export const handleUpload = (e, csvObject) => {
  let file = e.target.files[0];
  let fileReader = new FileReader();

  if (file === undefined) return; /* 방어 코드 추가 */

  fileReader.readAsText(file, "utf-8"); // or euc-kr

  fileReader.onload = function () {
    //console.log(fileReader.result);
    parsingCsv(fileReader.result, csvObject);
  };
};

export const mySplit = (line, delimiter, ignore) => {
  let spt = [];
  let tmp = "";
  let flag = false;

  for (let i = 0; i < line.length; i++) {
    if (ignore === line[i] && flag === true) {
      flag = false;
      continue;
    } else if (ignore === line[i]) {
      flag = true;
      continue;
    }

    if (line[i] === delimiter && flag === false) {
      spt.push(tmp);
      tmp = "";

      continue;
    }

    tmp += line[i];
  }

  spt.push(tmp);

  return spt;
};

export const parsingCsv = (file) => {
  let sptLine = file.split(/\r\n|\n/);
  console.log(sptLine);

  for (let line of sptLine) {
    if (line === "") continue;

    let spt = mySplit(line, DELIMITER, APOSTROPHE);
    console.log(spt);
  }

  return;
};
