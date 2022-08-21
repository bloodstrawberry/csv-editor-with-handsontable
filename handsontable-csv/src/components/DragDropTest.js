// DragDropTest.js
import React, { useState } from "react";
import * as lib from "./library.js";
import "../css/DragDropTest.scss";

const DragDropTest = () => {
  const [dropFlag, setDropFlag] = useState(false);

  return (
    <div
      id="drag-drop-field"
      className={dropFlag ? "in" : ""}
      onDrop={(e) => lib.handleOnDrop(e, setDropFlag)}
      onDragOver={(e) => lib.handleDragOver(e, setDropFlag)}
      onDragLeave={(e) => lib.handleOnDragLeave(e, setDropFlag)}
    >
      <p>drag & drop</p>
    </div>
  );
};

export default DragDropTest;