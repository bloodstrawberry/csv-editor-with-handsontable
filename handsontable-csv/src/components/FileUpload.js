// FileUpload.js
import React, { useState } from "react";
import * as lib from "./library.js";
import "../css/FileUpload.scss";

const FileUpload = ({setCsvObject}) => {
  const [dropFlag, setDropFlag] = useState(false);

  return (
    <div
      id="drag-drop-field"
      className={dropFlag ? "in" : ""}
      onDrop={(e) => lib.handleOnDrop(e, setDropFlag, setCsvObject)}
      onDragOver={(e) => lib.handleDragOver(e, setDropFlag)}
      onDragLeave={(e) => lib.handleOnDragLeave(e, setDropFlag)}
    >
      <p>drag & drop</p>
      <input type="file" accept=".csv" onChange={(e) => lib.handleUpload(e, setCsvObject)}/>
    </div>
  );
};

export default FileUpload;