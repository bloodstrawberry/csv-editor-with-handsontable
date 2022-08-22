//MyOptions.js
import React, { useState, useEffect } from "react";
import * as mnode from "./nodelibrary";

const getOptionsForVersion = (item) => {
  return (
    <option key={item} value={item}>
      {item}
    </option>
  );
};

const MyOptions = () => {
  const [versionList, setVersionList] = useState([]);

  const init = () => {
    mnode.getVersionList(setVersionList);
  };

  useEffect(init, []);

  return (
    <div>
      <form>
        <span>Version : </span>
        <select>
          <option value="">선택하세요.</option>
          {versionList.map((item) => getOptionsForVersion(item))}
        </select>
      </form>
    </div>
  );
};

export default MyOptions;