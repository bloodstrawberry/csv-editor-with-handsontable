// FileUpload.js
import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import * as lib from "./library.js";
import "../css/FileUpload.scss";

const FileUpload = ({ setCsvObject, fileUploadFlag, flagOn, flagOff }) => {
  const [dropFlag, setDropFlag] = useState(false);

  return (
    <div>
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