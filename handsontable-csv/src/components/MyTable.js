//MyTable.js
import React, { useEffect, useState } from "react";
import * as lib from "./library.js";

import "handsontable/dist/handsontable.full.css";
import Handsontable from "handsontable";

let myTable;
let currentRow, currentColumn;

const getCell = (cell) => {
  if(cell === null) return ``;
  return cell.includes(",") ? `"${cell}"` : `${cell}`;
}

const csvDownLoad = () => {
  let rows = myTable.countRows();
  let cols = myTable.countCols();
  let tmpTables = myTable.getData(0, 0, rows - 1, cols - 1);
  let maxRow, maxCol;
  
  maxCol = 0;
  for(let r = 0; r < rows; r++) {
    for(let c = cols - 1; c >=0; c--) {
      if(!(tmpTables[r][c] === "" || tmpTables[r][c] === null)) {
        maxCol = (maxCol < c) ? c : maxCol;
        break;
      }
    }
  }

  maxRow = 0;
  for(let c = 0; c < cols; c++) {
    for(let r = rows - 1; r >=0; r--) {
      if(!(tmpTables[r][c] === "" || tmpTables[r][c] === null)) {
        maxRow = (maxRow < r) ? r : maxRow;
        break;
      }
    }
  }

  let parsing = myTable.getData(0, 0, maxRow, maxCol)
                .map((item) => item.map((cell) => getCell(cell)));
  let realTable = parsing.map((item) => item.join(",")).join("\n");

  lib.downLoadCsv(realTable);

  return;
};

const MyTable = ({ csvFile }) => {
  const [displayIndex, setDisplayIndex] = useState("");
  const [displayCell, setDisplayCell] = useState("");
  
  const selectCell = () => {
    let selected = myTable.getSelectedLast();

    currentRow = selected[0];
    currentColumn = selected[1];

    if(currentRow < 0 || currentColumn < 0) return;

    setDisplayCell(myTable.getValue());
    setDisplayIndex(`${lib.rowToAlpha(currentColumn + 1)}${currentRow + 1}`);
  }

  const setValueCell = (e) => {
    if(currentRow < 0 || currentColumn < 0) return;

    setDisplayCell(e.target.value); 
    myTable.setDataAtCell(currentRow, currentColumn, e.target.value);
  }

  const init = (csvFile) => {
    if (csvFile === undefined || csvFile.HEIGHT === 0) return;
  
    const container = document.getElementById("hot-app");
  
    myTable = new Handsontable(container, {
      data: lib.makeTable(csvFile, 2, 3),
      colHeaders: true,         /* column header는 보이게 설정 */
      rowHeaders: true,         /* row header 보이게 설정 */
      colWidths: [60, 60, 60, 60, 60, 60, 60],
      wordWrap: false,          /* 줄 바꿈 x */
      width: "50%",
      manualColumnResize: true, /* column 사이즈 조절 */
      manualRowResize: true,    /* row 사이즈 조절 */
      manualColumnMove: true,   /* column move 허용 */
      manualRowMove: true,      /* row move 허용 */
      dropdownMenu: true,       /* dropdown 메뉴 설정 */
      filters: true,            /* 필터 기능 on */
      contextMenu: true,        /* cell 클릭 시 메뉴 설정 */
      licenseKey: "non-commercial-and-evaluation",
      afterSelection: selectCell,
    });
  };
  
  useEffect(() => {
    init(csvFile);
  }, [csvFile]);

  return (
    <div>
      <button onClick={csvDownLoad}>DOWNLOAD</button>
      <div>
        <span>{displayIndex}</span>
        <input value={displayCell} onChange={setValueCell} />
      </div>
      <div id="hot-app">
      </div>
    </div>
  );
};

export default MyTable;