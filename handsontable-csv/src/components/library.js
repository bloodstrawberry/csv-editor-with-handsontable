// library.js

const DELIMITER = ',';
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

export const handleOnDrop = (e, setState, setCsvObject) => {
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
  return false; 
};

export const handleUpload = (e, setCsvObject) => {
  let file = e.target.files[0];
  let fileReader = new FileReader();
  
  if(file === undefined) return; /* 방어 코드 추가 */

  fileReader.readAsText(file, "utf-8"); // or euc-kr

  fileReader.onload = function () {
    //console.log(fileReader.result); 
    parsingCsv(fileReader.result, setCsvObject);
  };
}

export const mySplit = (line, delimiter, ignore) => {
  let spt = [];
  let tmp = "";
  let flag = false;

  for(let i = 0; i < line.length; i++)
  {
    if(ignore === line[i] && flag === true) 
    {
      flag = false;
      continue;
    }
    else if(ignore === line[i])
    {
      flag = true;
      continue;
    } 
    
    if(line[i] === delimiter && flag === false) {
      spt.push(tmp);
      tmp = "";

      continue;
    }

    tmp += line[i];
  }

  spt.push(tmp);

  return spt;
}

export const parsingCsv = (file, setCsvObject) => {
  let height, width;
  let obj = {
    HEIGHT: 0,
    WIDTH: 0,
    csv: [],
  };

  obj.csv = [];

  let sptLine = file.split(/\r\n|\n/);
  console.log(sptLine);

  height = 0;
  for(let line of sptLine)
  {
    if(line === "") continue;

    let spt = mySplit(line, DELIMITER, APOSTROPHE);

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
      
    for(let h = 0; h < csvObject.HEIGHT; h++)
    {
      let line = [];
      for(let w = 0; w < csvObject.WIDTH; w++) line.push(csvObject.csv[h][w]);
      for(let w = 0; w < width; w++) line.push("");
  
      table.push(line);
    }
  
    for(let h = 0; h < height; h++) 
    {
      let dummy = [];
      for(let w = 0; w < csvObject.WIDTH + width; w++) dummy.push("");
      table.push(dummy);
    }
  
    return table;
  }