//App.js
import React, { useState } from "react";

import FileUpload from "./components/FileUpload";
import MyTable from "./components/MyTable";
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
  return (
    <div>
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