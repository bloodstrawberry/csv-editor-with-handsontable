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
    colHeaders: true,         /* column header는 보이게 설정 */
    rowHeaders: true,         /* row header 보이게 설정 */
    width: "50%",
    manualColumnResize: true, /* column 사이즈 조절 */
    manualRowResize: true,    /* row 사이즈 조절 */
    manualColumnMove: true,   /* column move 허용 */
    manualRowMove: true,      /* row move 허용 */
    dropdownMenu: true,       /* dropdown 메뉴 설정 */
    filters: true,            /* 필터 기능 on */
    contextMenu: true,        /* cell 클릭 시 메뉴 설정 */
    licenseKey: "non-commercial-and-evaluation",
  });
};

const MyTable = ({ csvFile }) => {
  useEffect(() => {
    init(csvFile);
  }, [csvFile]);

  return (
    <div>
      <div id="hot-app">
      </div>
    </div>
  );
};

export default MyTable;