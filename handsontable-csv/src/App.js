//App.js
import React, { useEffect, useState } from "react";

import FileUpload from "./components/FileUpload";
import MyFileList from "./components/MyFileList";
import MyTable from "./components/MyTable";
import MyToggles from "./components/MyToggles";
import * as mnode from "./components/nodelibrary";

const csvObjectDefault = {
  HEIGHT: 0,
  WIDTH: 0,
  csv: [],
};

const nodeTest = () => {

  mnode.getFileFolderList(mnode.PATH, "csv");
  return;
}

const App = () => {
  const [csvObject, setCsvObject] = useState(csvObjectDefault);
  const [version, setVersion] = useState("");
  const [country, setCountry] = useState("");
  const [file, setFile] = useState("");
  const [fileList, setFileList] = useState([]);

  const getFileList = () => {
    if(version === "" || country === "") return;

    let path = `${mnode.PATH}/${version}/${country}`;
    mnode.getFileList(path, "csv", setFileList);
  }

  useEffect(getFileList, [version, country]);

  return (
    <div>
      <MyToggles
        version={version}
        setVersion={setVersion}
        country={country}
        setCountry={setCountry}
      />

      <hr style={{ borderColor: "grey" }} />

      <MyFileList fileList={fileList} setFile={setFile} />

      <button onClick={nodeTest}>서버 연결</button>
      <button onClick={() => console.log(csvObject)}>print csv</button>
      <div className="App">
        <FileUpload
          setCsvObject={setCsvObject}
          pathInfo={{ version, country, file }}
        />
        <MyTable
          csvFile={csvObject}
          pathInfo={{ version, country, file }}
          fileList={fileList}
          setFileList={setFileList}
        />
      </div>
    </div>
  );
};

export default App;