//MyFileList.js
import React from "react";

const getOptionsForVersion = (item) => {
  return (
    <option key={item} value={item}>
      {item}
    </option>
  );
};

const MyFileList = ({fileList}) => {

  return (
    <div>
      <form>
        <span>FileName : </span>
        <select>
          <option value="">선택하세요.</option>
          {fileList.map((item) => getOptionsForVersion(item))}
        </select>
      </form>
    </div>
  );
};

export default MyFileList;