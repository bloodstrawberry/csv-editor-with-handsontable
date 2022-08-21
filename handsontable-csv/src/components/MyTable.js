//MyTable.js
import React, { useEffect } from "react";

import "handsontable/dist/handsontable.full.css";
import Handsontable from "handsontable";
//import { HotTable } from "@handsontable/react";

let myTable;

const init = (csvFile) => {
  console.log(csvFile);
  if (csvFile === undefined || csvFile.HEIGHT === 0) return;

  const container = document.getElementById("hot-app");

  myTable = new Handsontable(container, {
    data: csvFile.csv,
    colHeaders: true,
    rowHeaders: true,
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