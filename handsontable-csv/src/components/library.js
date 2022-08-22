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

export const handleOnDrop = (e, setState, setCsvObject, flagOff) => {
  e.preventDefault();

  let file = e.dataTransfer.files[0];
  let fileReader = new FileReader();

  fileReader.readAsText(file, "utf-8"); // or euc-kr

  fileReader.onload = function () {
    //console.log(fileReader.result);
    parsingCsv(fileReader.result, setCsvObject);
    return;
  };

  setState(false);
  flagOff();
  return false;
};

export const handleUpload = (e, setCsvObject, flagOff) => {
  let file = e.target.files[0];
  let fileReader = new FileReader();

  if (file === undefined) return; /* 방어 코드 추가 */

  fileReader.readAsText(file, "utf-8"); // or euc-kr

  fileReader.onload = function () {
    //console.log(fileReader.result);
    parsingCsv(fileReader.result, setCsvObject);
  };
  flagOff();
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

export const parsingCsv = (file, setCsvObject) => {
    let height, width;
    let obj = {
      HEIGHT: 0,
      WIDTH: 0,
      csv: [],
    };
  
    obj.csv = [];
  
    let sptLine = file.split(/\r\n|\n/);
    
    let maxLength = 0;
    for(let line of sptLine) {
      let spt = mySplit(line, DELIMITER, APOSTROPHE);
      if(maxLength < spt.length) maxLength = spt.length;
    }
    
    height = 0;
    for(let line of sptLine)
    {
      if(line === "") continue;
  
      let spt = mySplit(line, DELIMITER, APOSTROPHE);
      let pushCount = maxLength - spt.length;
      for(let i = 0; i < pushCount; i++) spt.push("");
  
      obj.csv.push(spt);
      height++;
    }
  
    width = obj.csv[0].length;
  
    obj.HEIGHT = height;
    obj.WIDTH = width;
  
    setCsvObject(obj);
  
    return;
  }

export const makeTable = (csvObject, height, width) => {
  let table = [];

  for (let h = 0; h < csvObject.HEIGHT; h++) {
    let line = [];
    for (let w = 0; w < csvObject.WIDTH; w++) line.push(csvObject.csv[h][w]);
    for (let w = 0; w < width; w++) line.push("");

    table.push(line);
  }

  for (let h = 0; h < height; h++) {
    let dummy = [];
    for (let w = 0; w < csvObject.WIDTH + width; w++) dummy.push("");
    table.push(dummy);
  }

  return table;
};

export const downLoadCsv = (contents, fileName = "MyFile.csv") => {
  let fileDown = "data:csv;charset=utf-8," + contents;

  let encodedUri = encodeURI(fileDown);
  let link = document.createElement("a");

  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName);

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

export const rowToAlpha = (row) => {
  const numToAlpha = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z",
  ];

  if (row <= 26) return numToAlpha[row - 1];

  if (26 < row && row <= 26 * 26) {
    let front = numToAlpha[parseInt(row / 26) - 1];
    let back = numToAlpha[(row % 26) - 1];

    if (row % 26 === 0) {
      back = "Z";
      front = numToAlpha[parseInt(row / 26) - 2];
    }

    return front + back;
  }

  return "too_long";
};
