//MyToggles.js
import React, { useState, useEffect } from "react";
import * as mnode from "./nodelibrary";
import "../css/MyToggles.scss";

const MyToggles = ({version, setVersion}) => {
  const [versionList, setVersionList] = useState([]);

  const onClickToggles = (value, setState) => {
    setState(value);
  };

  const makeVersion = () => {
    if(versionList.length === 0) return;
    
    return versionList.map((ver, idx) => (
      <div
        key={idx}
        className={ver === version? "btn-child selected" : "btn-child"}
        onClick={(e) => onClickToggles(e.target.innerText, setVersion)}
      >
        {ver}
      </div>
    ));
  }

  const init = () => {
    mnode.getVersionList(setVersionList);
  };

  useEffect(init, []);

  return (
    <div>
      <div className="btn-set">{makeVersion()}</div>
    </div>
  );
};

export default MyToggles;