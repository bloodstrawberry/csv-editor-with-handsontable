//MyToggles.js
import React, { useState, useEffect } from "react";
import * as mnode from "./nodelibrary";
import "../css/MyToggles.scss";

const MyToggles = ({ version, setVersion }) => {
  const LOCAL_STORAGE = {
    LS_VERSION: setVersion,
  };

  const [versionList, setVersionList] = useState([]);

  const onClickToggles = (value, setState, lsKey) => {
    setState(value);
    if(lsKey) localStorage.setItem(lsKey, value);
  };

  const makeVersion = () => {
    if (versionList.length === 0) return;

    return versionList.map((ver, idx) => (
      <div
        key={idx}
        className={ver === version ? "btn-child selected" : "btn-child"}
        onClick={(e) => onClickToggles(e.target.innerText, setVersion, 'LS_VERSION')}
      >
        {ver}
      </div>
    ));
  };

  const init = () => {
    mnode.getVersionList(setVersionList);

    for (let key in LOCAL_STORAGE) {
      let data = localStorage.getItem(key);
      if (data !== null) onClickToggles(data, LOCAL_STORAGE[key], key);
    }
  };

  useEffect(init, []);

  return (
    <div>
      <div className="btn-set">{makeVersion()}</div>
    </div>
  );
};

export default MyToggles;