// FileUpload.js
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import * as lib from "./library.js";
import * as mnode from "./nodelibrary.js";
import "../css/FileUpload.scss";

const FileUpload = ({ setCsvObject, fileUploadFlag, flagOn, flagOff, pathInfo }) => {
  const [dropFlag, setDropFlag] = useState(false);

  const onClickFileLoad = () => {
    let my_input = document.getElementById("my-input");
    my_input.click();
  };

  const uploadOptionFile = () => {
    const { version, country, file } = pathInfo;

    if(version === "" || country === "" || file === "") return;

    flagOn();
    let filePath = `${mnode.PATH}/${version}/${country}/${file}`;

    fetch(`${mnode.MY_SERVER}/getFile?path=${filePath}`)
    .then((response) => response.json())
    .then((data) => lib.parsingCsv(data.info, setCsvObject));
  }

  useEffect(uploadOptionFile, [pathInfo.file]);

  return (
    <div>
      {fileUploadFlag && <button onClick={onClickFileLoad}>불러오기</button>}
      <input
        id="my-input"
        style={{ visibility: "hidden" }}
        type="file"
        accept=".csv"
        onChange={(e) => lib.handleUpload(e, setCsvObject, flagOn)}
      />
      {!fileUploadFlag && (
        <div
          id="drag-drop-field"
          className={dropFlag ? "in" : ""}
          onDrop={(e) => lib.handleOnDrop(e, setDropFlag, setCsvObject, flagOn)}
          onDragOver={(e) => lib.handleDragOver(e, setDropFlag)}
          onDragLeave={(e) => lib.handleOnDragLeave(e, setDropFlag)}
        >
          <p>drag & drop</p>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => lib.handleUpload(e, setCsvObject, flagOn)}
          />
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  //console.log(state);
  return { fileUploadFlag: state };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    flagOn: () => dispatch(actionCreators.flagOn()),
    flagOff: () => dispatch(actionCreators.flagOff()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);