//MyToggles.js
import React, { useState, useEffect } from "react";
import * as mnode from "./nodelibrary";
import "../css/MyToggles.scss";

const MyToggles = ({ version, setVersion, country, setCountry }) => {
  const LOCAL_STORAGE = {
    LS_VERSION: setVersion,
    LS_COUNTRY: setCountry,
  };

  const [versionList, setVersionList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const onClickToggles = (value, setState, lsKey) => {
    setState(value);
    if (lsKey) localStorage.setItem(lsKey, value);
  };

  const makeToggles = (toggleList, value, selected, setState, lsKey) => {
    if (toggleList.length === 0) return;

    return toggleList.map((tog, idx) => (
      <div
        key={idx}
        className={tog === value ? `btn-child ${selected}` : "btn-child"}
        onClick={(e) => onClickToggles(e.target.innerText, setState, lsKey)}
      >
        {tog}
      </div>
    ));
  };

  const getCountryList = () => {
    if (version === "" || version === undefined) return;

    let path = `${mnode.PATH}/${version}`;
    mnode.getFolderList(setCountryList, path);
  };

  const init = () => {
    let path = `${mnode.PATH}`;
    mnode.getFolderList(setVersionList, path);

    for (let key in LOCAL_STORAGE) {
      let data = localStorage.getItem(key);
      if (data !== null) onClickToggles(data, LOCAL_STORAGE[key], key);
    }
  };

  useEffect(init, []);
  useEffect(getCountryList, [version]);

  return (
    <div>
      <div className="btn-set">
        {makeToggles(
          versionList,
          version,
          "selected",
          setVersion,
          "LS_VERSION"
        )}
      </div>
      <div className="btn-set">
        {makeToggles(
          countryList,
          country,
          "selected-country",
          setCountry,
          "LS_COUNTRY"
        )}
      </div>
    </div>
  );
};

export default MyToggles;