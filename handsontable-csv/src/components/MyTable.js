//MyTable.js
import React, { useEffect } from "react";
import * as lib from "./library.js";

import "handsontable/dist/handsontable.full.css";
import Handsontable from "handsontable";

let myTable;

const init = (csvFile) => {
  if (csvFile === undefined || csvFile.HEIGHT === 0) return;

  const container = document.getElementById("hot-app");

  myTable = new Handsontable(container, {
    data: lib.makeTable(csvFile, 2, 3),
    colHeaders: true /* column header는 보이게 설정 */,
    rowHeaders: true /* row header 보이게 설정 */,
    width: "50%",
    manualColumnResize: true /* column 사이즈 조절 */,
    manualRowResize: true /* row 사이즈 조절 */,
    manualColumnMove: true /* column move 허용 */,
    manualRowMove: true /* row move 허용 */,
    dropdownMenu: true /* dropdown 메뉴 설정 */,
    filters: true /* 필터 기능 on */,
    contextMenu: true /* cell 클릭 시 메뉴 설정 */,
    licenseKey: "non-commercial-and-evaluation",
  });
};

const getCell = (cell) => {
  if (cell === null || cell === undefined) return ``;
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

const MyTable = ({ csvFile }) => {
    useEffect(() => {
      init(csvFile);
    }, [csvFile]);
  
    return (
      <div>
        <button onClick={csvDownLoad}>DOWNLOAD</button>
        <div id="hot-app">
        </div>
      </div>
    );
  };

export default MyTable;
