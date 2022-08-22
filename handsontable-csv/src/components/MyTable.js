/* eslint-disable react-hooks/exhaustive-deps */
//MyTable.js
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as lib from "./library.js";
import * as mnode from "./nodelibrary";

import "handsontable/dist/handsontable.full.css";
import Handsontable from "handsontable";
import AutoSizeInput from "./AutoSizeInput";
import axios from "axios";

let myTable;
let currentRow, currentColumn;

const getCell = (cell) => {
  if (cell === null) return ``;
  return cell.includes(",") ? `"${cell}"` : `${cell}`;
};

const csvDownLoad = () => {
  let rows = myTable.countRows();
  let cols = myTable.countCols();
  let tmpTables = myTable.getData(0, 0, rows - 1, cols - 1);
  let maxRow, maxCol;

  maxCol = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = cols - 1; c >= 0; c--) {
      if (!(tmpTables[r][c] === "" || tmpTables[r][c] === null)) {
        maxCol = maxCol < c ? c : maxCol;
        break;
      }
    }
  }

  maxRow = 0;
  for (let c = 0; c < cols; c++) {
    for (let r = rows - 1; r >= 0; r--) {
      if (!(tmpTables[r][c] === "" || tmpTables[r][c] === null)) {
        maxRow = maxRow < r ? r : maxRow;
        break;
      }
    }
  }

  let parsing = myTable
    .getData(0, 0, maxRow, maxCol)
    .map((item) => item.map((cell) => getCell(cell)));
  let realTable = parsing.map((item) => item.join(",")).join("\n");

  lib.downLoadCsv(realTable);

  return;
};

const MyTable = ({
  csvFile,
  fileUploadFlag,
  pathInfo,
  fileList,
  setFileList,
}) => {
  const [displayIndex, setDisplayIndex] = useState("");
  const [displayCell, setDisplayCell] = useState("");
  const [value, setValue] = useState("");

  const saveFile = () => {
    for (let name of fileList) {
      if (name === value) {
        let answer = window.confirm(
          `${name}이(가) 이미 있습니다.\n바꾸시겠습니까?`
        );
        if (answer === false) return;
      }
    }

    let rows = myTable.countRows();
    let cols = myTable.countCols();
    let tmpTables = myTable.getData(0, 0, rows - 1, cols - 1);
    let maxRow, maxCol;

    maxCol = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = cols - 1; c >= 0; c--) {
        if (!(tmpTables[r][c] === "" || tmpTables[r][c] === null)) {
          maxCol = maxCol < c ? c : maxCol;
          break;
        }
      }
    }

    maxRow = 0;
    for (let c = 0; c < cols; c++) {
      for (let r = rows - 1; r >= 0; r--) {
        if (!(tmpTables[r][c] === "" || tmpTables[r][c] === null)) {
          maxRow = maxRow < r ? r : maxRow;
          break;
        }
      }
    }

    let parsing = myTable
      .getData(0, 0, maxRow, maxCol)
      .map((item) => item.map((cell) => getCell(cell)));
    let realTable = parsing.map((item) => item.join(",")).join("\n");

    let filePath = `${mnode.PATH}/${pathInfo.version}/${pathInfo.country}`;
    let fileName = `${filePath}/${value}`;

    const config = {
      header: { "content-type": "application/json" },
    };

    axios
      .post(
        `${mnode.MY_SERVER}/fileSave?fileName=${fileName}`,
        { file: realTable },
        config
      )
      .then((response) => {
        if (response.status === 200)
          mnode.getFileList(filePath, "csv", setFileList);
      });

    alert(
      `${value} 파일이 ${pathInfo.version}/${pathInfo.country}에 저장되었습니다.`
    );

    return;
  };

  const deleteFile = () => {
    if (pathInfo.version === "" || pathInfo.country === "" || pathInfo.file === "") {
      alert("version / country / file을 모두 선택하세요.");
      return;
    }

    let filePath = `${mnode.PATH}/${pathInfo.version}/${pathInfo.country}`;
    let fileName = `${filePath}/${pathInfo.file}`;

    let answer = window.confirm(`${fileName}를 정말 삭제하시겠습니까?`);
    if (answer === false) return;

    mnode.deleteFiles(fileName, function () {
      mnode.getFileList(filePath, "csv", setFileList);
    });
  };

  const uploadFiles = (e) => {
    if(e.target.files.length === 0) return;

    let objFileList = {}; /* 중복 체크를 위한 object */
    for(let item of fileList) objFileList[item] = true;

    let uploadFileList = [];
    for(let i = 0; i < e.target.files.length; i++) {
      let fileName = e.target.files[i].name;

      if(objFileList[fileName] === true) {
        let answer = window.confirm(`${fileName}이(가) 이미 있습니다.\n바꾸시겠습니까?`);
        if(answer === false) continue;
      }
      
      uploadFileList.push(e.target.files[i]);
    }

    if(uploadFileList.length === 0) return;
    
    let path = `${mnode.PATH}/${pathInfo.version}/${pathInfo.country}`;
    mnode.uploadFiles(path, uploadFileList, function () {
      mnode.getFileList(path, "csv", setFileList);
    });

    return;
  }

  const onClickUpload = () => {
    if(pathInfo.version === "" || pathInfo.country === "") {
      alert("version / country를 모두 선택하세요.");
      return;
    }

    document.getElementById("hidden-upload").click();
  }

  const selectCell = () => {
    let selected = myTable.getSelectedLast();

    currentRow = selected[0];
    currentColumn = selected[1];

    if (currentRow < 0 || currentColumn < 0) return;

    setDisplayCell(myTable.getValue());
    setDisplayIndex(`${lib.rowToAlpha(currentColumn + 1)}${currentRow + 1}`);
  };

  const setValueCell = (e) => {
    if (currentRow < 0 || currentColumn < 0) return;

    setDisplayCell(e.target.value);
    myTable.setDataAtCell(currentRow, currentColumn, e.target.value);
  };

  const init = (csvFile) => {
    if (csvFile === undefined || csvFile.HEIGHT === 0) return;

    const container = document.getElementById("hot-app");

    if (myTable !== undefined) myTable.destroy();

    myTable = new Handsontable(container, {
      data: lib.makeTable(csvFile, 2, 3),
      colHeaders: true /* column header는 보이게 설정 */,
      rowHeaders: true /* row header 보이게 설정 */,
      colWidths: [60, 60, 60, 60, 60, 60, 60],
      wordWrap: false /* 줄 바꿈 x */,
      width: "50%",
      manualColumnResize: true /* column 사이즈 조절 */,
      manualRowResize: true /* row 사이즈 조절 */,
      manualColumnMove: true /* column move 허용 */,
      manualRowMove: true /* row move 허용 */,
      dropdownMenu: true /* dropdown 메뉴 설정 */,
      filters: true /* 필터 기능 on */,
      contextMenu: true /* cell 클릭 시 메뉴 설정 */,
      licenseKey: "non-commercial-and-evaluation",
      afterSelection: selectCell,
    });
  };

  useEffect(() => {
    init(csvFile);
  }, [csvFile]);

  useEffect(() => {
    setValue(pathInfo.file);
  }, [pathInfo.file]);

  return (
    <div>
      {fileUploadFlag && (
        <div>
          <button onClick={csvDownLoad}>DOWNLOAD</button>
          <button onClick={saveFile}>SAVE</button>
          <button onClick={deleteFile}>DELETE</button>
          <button onClick={onClickUpload}>UPLOAD</button>
          <AutoSizeInput
            placeholder="파일 이름 입력"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div>
            <span>{displayIndex}</span>
            <input value={displayCell} onChange={setValueCell} />
          </div>
          <input
            type="file"
            id="hidden-upload"
            style={{ visibility: "hidden" }}
            accept=".csv"
            multiple
            onChange={(e) => uploadFiles(e)}
          />
          <div id="hot-app"></div>
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  //console.log(state);
  return { fileUploadFlag: state };
}

export default connect(mapStateToProps)(MyTable);