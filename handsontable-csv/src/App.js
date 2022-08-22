//App.js
import React, { useState } from "react";

import FileUpload from "./components/FileUpload";
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

  return (
    <div>
      <MyToggles
        version={version}
        setVersion={setVersion}
      />
      <button onClick={nodeTest}>서버 연결</button>
      <button onClick={() => console.log(csvObject)}>print csv</button>
      <div className="App">
        <FileUpload setCsvObject={setCsvObject} />
        <MyTable csvFile={csvObject}/>
      </div>
    </div>
  );
};

export default App;